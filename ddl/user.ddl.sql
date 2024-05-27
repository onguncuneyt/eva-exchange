CREATE TABLE IF NOT EXISTS "public"."users" ("id" UUID NOT NULL , "password" VARCHAR(255) NOT NULL, "email" VARCHAR(255) NOT NULL UNIQUE, "roles" VARCHAR(255)[] NOT NULL DEFAULT ARRAY['user']::VARCHAR(255)[], "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));