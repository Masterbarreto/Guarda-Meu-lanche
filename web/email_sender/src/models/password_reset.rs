#![allow(unused_imports)]

use chrono::{NaiveDateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use time::PrimitiveDateTime;

pub struct PasswordResetCode {
    pub id: Option<i32>,
    pub email: String,
    pub verification_code: String,
    pub created_at: Option<NaiveDateTime>,
    pub expires_at: PrimitiveDateTime,
}

impl PasswordResetCode {
    pub async fn insert(&mut self, pool: &PgPool) -> Result<i32, sqlx::Error> {
        let record = sqlx::query!(
            r#"
            INSERT INTO password_reset_codes (email, verification_code, created_at, expires_at)
            VALUES ($1, $2, NOW(), $3)
            ON CONFLICT (email) DO UPDATE
            SET verification_code = EXCLUDED.verification_code,
                created_at = NOW(),
                expires_at = EXCLUDED.expires_at
            RETURNING id;
            "#,
            self.email,
            self.verification_code,
            self.expires_at,
        )
        .fetch_one(pool)
        .await?
        .id;

        self.id = Some(record);

        Ok(record)
    }
}
