revoke delete on table "public"."brands" from "anon";

revoke insert on table "public"."brands" from "anon";

revoke references on table "public"."brands" from "anon";

revoke select on table "public"."brands" from "anon";

revoke trigger on table "public"."brands" from "anon";

revoke truncate on table "public"."brands" from "anon";

revoke update on table "public"."brands" from "anon";

revoke delete on table "public"."brands" from "authenticated";

revoke insert on table "public"."brands" from "authenticated";

revoke references on table "public"."brands" from "authenticated";

revoke select on table "public"."brands" from "authenticated";

revoke trigger on table "public"."brands" from "authenticated";

revoke truncate on table "public"."brands" from "authenticated";

revoke update on table "public"."brands" from "authenticated";

revoke delete on table "public"."brands" from "service_role";

revoke insert on table "public"."brands" from "service_role";

revoke references on table "public"."brands" from "service_role";

revoke select on table "public"."brands" from "service_role";

revoke trigger on table "public"."brands" from "service_role";

revoke truncate on table "public"."brands" from "service_role";

revoke update on table "public"."brands" from "service_role";

revoke delete on table "public"."movies" from "anon";

revoke insert on table "public"."movies" from "anon";

revoke references on table "public"."movies" from "anon";

revoke select on table "public"."movies" from "anon";

revoke trigger on table "public"."movies" from "anon";

revoke truncate on table "public"."movies" from "anon";

revoke update on table "public"."movies" from "anon";

revoke delete on table "public"."movies" from "authenticated";

revoke insert on table "public"."movies" from "authenticated";

revoke references on table "public"."movies" from "authenticated";

revoke select on table "public"."movies" from "authenticated";

revoke trigger on table "public"."movies" from "authenticated";

revoke truncate on table "public"."movies" from "authenticated";

revoke update on table "public"."movies" from "authenticated";

revoke delete on table "public"."movies" from "service_role";

revoke insert on table "public"."movies" from "service_role";

revoke references on table "public"."movies" from "service_role";

revoke select on table "public"."movies" from "service_role";

revoke trigger on table "public"."movies" from "service_role";

revoke truncate on table "public"."movies" from "service_role";

revoke update on table "public"."movies" from "service_role";

revoke delete on table "public"."theater" from "anon";

revoke insert on table "public"."theater" from "anon";

revoke references on table "public"."theater" from "anon";

revoke select on table "public"."theater" from "anon";

revoke trigger on table "public"."theater" from "anon";

revoke truncate on table "public"."theater" from "anon";

revoke update on table "public"."theater" from "anon";

revoke delete on table "public"."theater" from "authenticated";

revoke insert on table "public"."theater" from "authenticated";

revoke references on table "public"."theater" from "authenticated";

revoke select on table "public"."theater" from "authenticated";

revoke trigger on table "public"."theater" from "authenticated";

revoke truncate on table "public"."theater" from "authenticated";

revoke update on table "public"."theater" from "authenticated";

revoke delete on table "public"."theater" from "service_role";

revoke insert on table "public"."theater" from "service_role";

revoke references on table "public"."theater" from "service_role";

revoke select on table "public"."theater" from "service_role";

revoke trigger on table "public"."theater" from "service_role";

revoke truncate on table "public"."theater" from "service_role";

revoke update on table "public"."theater" from "service_role";

revoke delete on table "public"."todos" from "anon";

revoke insert on table "public"."todos" from "anon";

revoke references on table "public"."todos" from "anon";

revoke select on table "public"."todos" from "anon";

revoke trigger on table "public"."todos" from "anon";

revoke truncate on table "public"."todos" from "anon";

revoke update on table "public"."todos" from "anon";

revoke delete on table "public"."todos" from "authenticated";

revoke insert on table "public"."todos" from "authenticated";

revoke references on table "public"."todos" from "authenticated";

revoke select on table "public"."todos" from "authenticated";

revoke trigger on table "public"."todos" from "authenticated";

revoke truncate on table "public"."todos" from "authenticated";

revoke update on table "public"."todos" from "authenticated";

revoke delete on table "public"."todos" from "service_role";

revoke insert on table "public"."todos" from "service_role";

revoke references on table "public"."todos" from "service_role";

revoke select on table "public"."todos" from "service_role";

revoke trigger on table "public"."todos" from "service_role";

revoke truncate on table "public"."todos" from "service_role";

revoke update on table "public"."todos" from "service_role";

alter table "public"."brands" drop constraint "brands_pkey";

alter table "public"."theater" drop constraint "theater_pkey";

alter table "public"."todos" drop constraint "todo_pkey";

drop index if exists "public"."brands_pkey";

drop index if exists "public"."theater_pkey";

drop index if exists "public"."todo_pkey";

drop table "public"."brands";

drop table "public"."movies";

drop table "public"."theater";

drop table "public"."todos";

drop type "public"."refund_status";


