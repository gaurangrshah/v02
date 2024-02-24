CREATE TABLE `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`email` text NOT NULL,
	`verified` integer NOT NULL,
	`verification_token` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`username` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX `user_key_user_id_idx` ON `user_key` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `user_session` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_subscriber_email_unique` ON `user_subscriber` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_subscriber_verification_token_unique` ON `user_subscriber` (`verification_token`);--> statement-breakpoint
CREATE INDEX `subscriber_user_id_idx` ON `user_subscriber` (`user_id`);