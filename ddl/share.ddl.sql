CREATE TABLE IF NOT EXISTS "public"."share" ("id" UUID NOT NULL , "name" VARCHAR(255) NOT NULL, "symbol" VARCHAR(255) NOT NULL, "amount" NUMBER NOT NULL, "rate" DECIMAL(10,2) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));