CREATE TABLE `travel_answer` (
	`id` text PRIMARY KEY,
	`ask_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`published_at` integer,
	`star` integer DEFAULT 0 NOT NULL,
	`like` integer DEFAULT 0 NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT `fk_travel_answer_ask_id_travel_ask_id_fk` FOREIGN KEY (`ask_id`) REFERENCES `travel_ask`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `travel_answer_askId_idx` ON `travel_answer` (`ask_id`);--> statement-breakpoint
CREATE INDEX `travel_answer_author_idx` ON `travel_answer` (`author`);--> statement-breakpoint
CREATE INDEX `travel_answer_published_idx` ON `travel_answer` (`published`);--> statement-breakpoint
CREATE INDEX `travel_answer_publishedAt_idx` ON `travel_answer` (`published_at`);