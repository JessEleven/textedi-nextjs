ALTER TABLE "document" RENAME TO "record";--> statement-breakpoint
ALTER TABLE "record" DROP CONSTRAINT "document_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "record" ADD CONSTRAINT "record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;