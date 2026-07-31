CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`kind` text NOT NULL,
	`language` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`payload` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_created_at_idx` ON `enquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `enquiries_kind_idx` ON `enquiries` (`kind`);