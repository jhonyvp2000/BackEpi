CREATE TABLE "epi_daily_indicators" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"outpatient_consultations" integer DEFAULT 0,
	"emergency_attendances" integer DEFAULT 0,
	"surgeries" integer DEFAULT 0,
	"occupancy_rate" numeric(5, 2) DEFAULT '0',
	"notes" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "epi_daily_indicators_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "epi_dengue_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_id" integer NOT NULL,
	"confirmed_cases" integer DEFAULT 0 NOT NULL,
	"alarm_signs_cases" integer DEFAULT 0 NOT NULL,
	"hospitalized_cases" integer DEFAULT 0 NOT NULL,
	"deaths" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "epi_bulletins" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_id" integer NOT NULL,
	"volume" text NOT NULL,
	"title" text NOT NULL,
	"file_url" text NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"published_at" timestamp,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "epi_weeks" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_number" integer NOT NULL,
	"year" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"presentation_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "epi_maternal_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_id" integer NOT NULL,
	"maternal_deaths" integer DEFAULT 0 NOT NULL,
	"perinatal_deaths" integer DEFAULT 0 NOT NULL,
	"severe_complications" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_id" varchar(50) NOT NULL,
	"resource" varchar NOT NULL,
	"action" varchar NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "epi_respiratory_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_id" integer NOT NULL,
	"ari_cases" integer DEFAULT 0 NOT NULL,
	"covid_cases" integer DEFAULT 0 NOT NULL,
	"influenza_cases" integer DEFAULT 0 NOT NULL,
	"icu_admissions" integer DEFAULT 0 NOT NULL,
	"deaths" integer DEFAULT 0 NOT NULL,
	"notes" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"system_id" varchar(50) NOT NULL,
	"name" varchar NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "systems" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "user_system_roles" (
	"user_id" uuid NOT NULL,
	"system_id" varchar(50) NOT NULL,
	"role_id" uuid NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_system_roles_user_id_system_id_role_id_pk" PRIMARY KEY("user_id","system_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dni" varchar(8) NOT NULL,
	"password_hash" varchar NOT NULL,
	"name" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"email" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_dni_unique" UNIQUE("dni"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "epi_dengue_records" ADD CONSTRAINT "epi_dengue_records_week_id_epi_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."epi_weeks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "epi_bulletins" ADD CONSTRAINT "epi_bulletins_week_id_epi_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."epi_weeks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "epi_maternal_records" ADD CONSTRAINT "epi_maternal_records_week_id_epi_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."epi_weeks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_system_id_systems_id_fk" FOREIGN KEY ("system_id") REFERENCES "public"."systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "epi_respiratory_records" ADD CONSTRAINT "epi_respiratory_records_week_id_epi_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."epi_weeks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_system_id_systems_id_fk" FOREIGN KEY ("system_id") REFERENCES "public"."systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_system_roles" ADD CONSTRAINT "user_system_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_system_roles" ADD CONSTRAINT "user_system_roles_system_id_systems_id_fk" FOREIGN KEY ("system_id") REFERENCES "public"."systems"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_system_roles" ADD CONSTRAINT "user_system_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;