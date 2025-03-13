import { Pool } from 'pg';
import { Badge, BadgeTemplate, IssuedBadge } from '../types/badge';

export class BadgeService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  }

  async getAllBadges(): Promise<Badge[]> {
    const query = `
      SELECT b.*, bt.name as template_name, bt.description as template_description
      FROM badges b
      JOIN badge_templates bt ON b.template_id = bt.id
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getUserBadges(userId: string): Promise<IssuedBadge[]> {
    const query = `
      SELECT b.*, ib.issued_date, ib.status,
        (SELECT json_agg(sh.*)
         FROM share_history sh
         WHERE sh.badge_id = b.id) as share_history
      FROM issued_badges ib
      JOIN badges b ON ib.badge_id = b.id
      WHERE ib.user_id = $1
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async createBadge(badge: BadgeTemplate): Promise<Badge> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      
      const templateQuery = `
        INSERT INTO badge_templates (name, description, image_url, criteria)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const templateValues = [
        badge.name,
        badge.description,
        badge.imageUrl,
        badge.criteria
      ];
      
      const templateResult = await client.query(templateQuery, templateValues);
      const templateId = templateResult.rows[0].id;
      
      const badgeQuery = `
        INSERT INTO badges (template_id, issuer_id)
        VALUES ($1, $2)
        RETURNING *
      `;
      const badgeResult = await client.query(badgeQuery, [templateId, badge.issuerId]);
      
      await client.query('COMMIT');
      return badgeResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async shareBadge(badgeId: string, userId: string, platform: string): Promise<void> {
    const query = `
      INSERT INTO share_history (badge_id, user_id, platform, shared_at)
      VALUES ($1, $2, $3, NOW())
    `;
    await this.pool.query(query, [badgeId, userId, platform]);
  }

  async verifyBadge(code: string): Promise<{ isValid: boolean; badge?: Badge }> {
    const query = `
      SELECT b.*, ib.status
      FROM badges b
      JOIN issued_badges ib ON b.id = ib.badge_id
      WHERE ib.verification_code = $1
    `;
    const result = await this.pool.query(query, [code]);
    
    if (result.rows.length === 0) {
      return { isValid: false };
    }
    
    return {
      isValid: true,
      badge: result.rows[0]
    };
  }
}