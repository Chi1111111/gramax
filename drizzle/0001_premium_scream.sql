CREATE TABLE `inspections` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` integer NOT NULL,
	`original_planned_date` text NOT NULL,
	`planned_date` text NOT NULL,
	`planned_time` text,
	`completed_date` text,
	`reschedule_count` integer DEFAULT 0 NOT NULL,
	`notes` text,
	`created_by` text NOT NULL,
	`updated_by` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `inspections_property_id_idx` ON `inspections` (`property_id`);--> statement-breakpoint
CREATE INDEX `inspections_planned_date_idx` ON `inspections` (`planned_date`);--> statement-breakpoint
CREATE INDEX `inspections_completed_date_idx` ON `inspections` (`completed_date`);--> statement-breakpoint
CREATE TABLE `properties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`route_order` integer NOT NULL,
	`address` text NOT NULL,
	`region` text NOT NULL,
	`key_code` text,
	`contact_name` text,
	`contact_phone` text,
	`last_inspection_date` text,
	`next_inspection_date` text,
	`inspection_interval_months` integer DEFAULT 3 NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `properties_route_order_idx` ON `properties` (`route_order`);--> statement-breakpoint
CREATE INDEX `properties_next_inspection_date_idx` ON `properties` (`next_inspection_date`);--> statement-breakpoint
CREATE INDEX `properties_region_idx` ON `properties` (`region`);