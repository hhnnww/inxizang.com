CREATE TABLE `travel_ask` (
	`id` text PRIMARY KEY,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`published_at` integer,
	`star` integer DEFAULT 0 NOT NULL,
	`like` integer DEFAULT 0 NOT NULL,
	`views` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `travel_ask_author_idx` ON `travel_ask` (`author`);--> statement-breakpoint
CREATE INDEX `travel_ask_published_idx` ON `travel_ask` (`published`);--> statement-breakpoint
CREATE INDEX `travel_ask_publishedAt_idx` ON `travel_ask` (`published_at`);