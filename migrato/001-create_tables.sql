-- +migrate Up 
CREATE TABLE public.auction (
    auction_id integer NOT NULL,
    seller_id integer NOT NULL,
    title text,
    description text,
    initial_bid real NOT NULL,
    exp_date date,
    image_url text,
    vector tsvector,
    auction_type integer,
    bid_multiple real,
    winner integer
);

CREATE SEQUENCE public.auction_auction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.bidding (
    bid_id bigint NOT NULL,
    bid_amount real,
    user_id integer NOT NULL,
    auction_id integer
);


CREATE SEQUENCE public.bidding_bid_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    jwt_token text,
    name text,
    profile_pic text,
    bio text
);

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




-- +migrate Down 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS auction;
DROP TABLE IF EXISTS bidding;
