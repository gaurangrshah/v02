CREATE TABLE IF NOT EXISTS `user_key` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`hashed_password` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_role` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`active_expires` blob NOT NULL,
	`idle_expires` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`verified` integer NOT NULL,
	`verification_token` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_token` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`issued_at` blob NOT NULL,
	`expires_at` blob NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`username` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `role_user_id_idx` ON `user_role` (`user_id`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `session_user_id_idx` ON `user_session` (`user_id`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `subscriber_user_id_idx` ON `user_subscriber` (`user_id`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `token_user_id_idx` ON `user_token` (`user_id`);
