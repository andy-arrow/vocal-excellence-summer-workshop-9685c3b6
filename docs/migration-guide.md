# Database Migration Guide

## Overview

This project uses Drizzle ORM with Replit PostgreSQL. Migrations are managed through Drizzle Kit.

## Migration Discipline

### Adding New Schema Changes

1. **Edit the schema file**: Make changes to `shared/schema.ts`
   - Add new tables, columns, or indexes
   - Use proper types and constraints

2. **Generate migration** (optional - for version control):
   ```bash
   npx drizzle-kit generate
   ```

3. **Push changes to database**:
   ```bash
   npm run db:push
   ```
   
   For destructive changes (use with caution):
   ```bash
   npm run db:push --force
   ```

### Schema Best Practices

- **Never change primary key types** - Changing `serial` to `varchar` or vice versa breaks existing data
- **Add indexes for frequently queried columns** - Especially `createdAt` and `email` fields
- **Use proper constraints** - `notNull()`, `unique()`, `default()` as needed
- **Keep schemas minimal** - Only add `createdAt`/`updatedAt` if truly needed

### Pre-Deploy Checklist

Before deploying schema changes:

1. [ ] Test changes in development database first
2. [ ] Run `npm run db:push` and verify no errors
3. [ ] Test affected API endpoints with sample data
4. [ ] Run health check: `GET /api/health`
5. [ ] Verify application starts without errors

### Example: Adding a New Column

```typescript
// In shared/schema.ts
export const applications = pgTable("applications", {
  // existing columns...
  newColumn: text("new_column").default(""),  // Add nullable with default
});
```

Then run:
```bash
npm run db:push
```

### Example: Adding a New Table

```typescript
// In shared/schema.ts
export const newTable = pgTable("new_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  nameIdx: index("new_table_name_idx").on(table.name),
}));

export type InsertNewTable = typeof newTable.$inferInsert;
export type NewTable = typeof newTable.$inferSelect;
```

### Common Migration Errors

| Error | Solution |
|-------|----------|
| `relation does not exist` | Run `npm run db:push` to create table |
| `column cannot be cast` | Don't change column types; add new column instead |
| `duplicate key` | Index already exists; safe to ignore |

## Database Connection

Environment variable: `DATABASE_URL`

The connection is managed in `server/db.ts` using:
- `pg` package for raw queries
- `drizzle-orm` for type-safe ORM operations

## Health Check

Always verify database health after migrations:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database": "connected",
  "backend": "replit",
  "latencyMs": 5
}
```
