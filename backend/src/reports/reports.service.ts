import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(private dataSource: DataSource) {}

  async ordersList(filters: any, limit = 100, offset = 0) {
    // Build dynamic WHERE clause with parameterized values
    const where: string[] = [];
    const params: any[] = [];
    let idx = 1;

    if (filters.date_from) {
      where.push(`(SELECT created_at FROM order_events WHERE order_id=o.id AND event='created' ORDER BY created_at LIMIT 1) >= $${idx++}`);
      params.push(filters.date_from);
    }
    if (filters.date_to) {
      where.push(`(SELECT created_at FROM order_events WHERE order_id=o.id AND event='created' ORDER BY created_at LIMIT 1) <= $${idx++}`);
      params.push(filters.date_to);
    }
    if (filters.city_id) { where.push(`o.city_id = $${idx++}`); params.push(filters.city_id); }
    if (filters.driver_id) { where.push(`o.driver_id = $${idx++}`); params.push(filters.driver_id); }
    if (filters.client_id) { where.push(`o.client_id = $${idx++}`); params.push(filters.client_id); }
    if (filters.service_type) { where.push(`o.service_type = $${idx++}`); params.push(filters.service_type); }
    if (filters.payment_type) { where.push(`o.payment_type = $${idx++}`); params.push(filters.payment_type); }
    if (filters.dispatcher_id) { where.push(`o.dispatcher_id = $${idx++}`); params.push(filters.dispatcher_id); }
    if (filters.search) {
      where.push(`(o.id::text ILIKE $${idx} OR o.client_phone ILIKE $${idx})`);
      params.push(`%${filters.search}%`);
      idx++;
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const sql = `
      SELECT
        o.id as order_id,
        o.city_id,
        o.driver_id,
        o.client_id,
        o.client_phone,
        o.service_type,
        o.payment_type,
        o.dispatcher_id,
        (SELECT created_at FROM order_events WHERE order_id=o.id AND event='created' ORDER BY created_at LIMIT 1) as created_at,
        (SELECT created_at FROM order_events WHERE order_id=o.id AND event='accepted' ORDER BY created_at LIMIT 1) as accepted_at,
        (SELECT created_at FROM order_events WHERE order_id=o.id AND event='cancelled' ORDER BY created_at LIMIT 1) as cancelled_at,
        (SELECT created_at FROM order_events WHERE order_id=o.id AND event='completed' ORDER BY created_at LIMIT 1) as completed_at
      FROM orders o
      ${whereSql}
      ORDER BY created_at DESC
      LIMIT $${idx++} OFFSET $${idx++}
    `;

    params.push(limit);
    params.push(offset);

    const rows = await this.dataSource.query(sql, params);
    return rows;
  }

  async ordersCount(filters: any) {
    const where: string[] = [];
    const params: any[] = [];
    let idx = 1;
    if (filters.date_from) { where.push(`(SELECT created_at FROM order_events WHERE order_id=o.id AND event='created' ORDER BY created_at LIMIT 1) >= $${idx++}`); params.push(filters.date_from); }
    if (filters.date_to) { where.push(`(SELECT created_at FROM order_events WHERE order_id=o.id AND event='created' ORDER BY created_at LIMIT 1) <= $${idx++}`); params.push(filters.date_to); }
    if (filters.city_id) { where.push(`o.city_id = $${idx++}`); params.push(filters.city_id); }
    if (filters.driver_id) { where.push(`o.driver_id = $${idx++}`); params.push(filters.driver_id); }
    if (filters.client_id) { where.push(`o.client_id = $${idx++}`); params.push(filters.client_id); }
    if (filters.service_type) { where.push(`o.service_type = $${idx++}`); params.push(filters.service_type); }
    if (filters.payment_type) { where.push(`o.payment_type = $${idx++}`); params.push(filters.payment_type); }
    if (filters.dispatcher_id) { where.push(`o.dispatcher_id = $${idx++}`); params.push(filters.dispatcher_id); }
    if (filters.search) { where.push(`(o.id::text ILIKE $${idx} OR o.client_phone ILIKE $${idx})`); params.push(`%${filters.search}%`); idx++; }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const sql = `SELECT count(*)::int as cnt FROM orders o ${whereSql}`;
    const res = await this.dataSource.query(sql, params);
    return res[0]?.cnt || 0;
  }

  // placeholders for other reports
  async driverShifts(filters: any) {
    return [];
  }

  async clientsReport(filters: any) {
    return [];
  }

  async messagesLog(filters: any) {
    return [];
  }
}
