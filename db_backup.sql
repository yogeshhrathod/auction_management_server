--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 11.5 (Ubuntu 11.5-1.pgdg18.04+1)

-- Started on 2019-08-28 16:51:51 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16449)
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 200 (class 1259 OID 16411)
-- Name: auction; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auction (
    auction_id integer NOT NULL,
    seller_id integer NOT NULL,
    title text,
    description text,
    initial_bid real NOT NULL,
    exp_date date,
    image_url text,
    vector tsvector
);


ALTER TABLE public.auction OWNER TO admin;

--
-- TOC entry 199 (class 1259 OID 16409)
-- Name: auction_auction_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auction_auction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auction_auction_id_seq OWNER TO admin;

--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 199
-- Name: auction_auction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auction_auction_id_seq OWNED BY public.auction.auction_id;


--
-- TOC entry 201 (class 1259 OID 16426)
-- Name: bidding; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bidding (
    auction_id integer NOT NULL,
    user_id integer NOT NULL,
    bid_amount real NOT NULL
);


ALTER TABLE public.bidding OWNER TO admin;

--
-- TOC entry 198 (class 1259 OID 16398)
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    email text NOT NULL,
    passroword text NOT NULL,
    jwt_token text,
    "Name" text
);


ALTER TABLE public."user" OWNER TO admin;

--
-- TOC entry 197 (class 1259 OID 16396)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO admin;

--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 197
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- TOC entry 2977 (class 2604 OID 17074)
-- Name: auction auction_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auction ALTER COLUMN auction_id SET DEFAULT nextval('public.auction_auction_id_seq'::regclass);


--
-- TOC entry 2976 (class 2604 OID 17075)
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- TOC entry 3114 (class 0 OID 16411)
-- Dependencies: 200
-- Data for Name: auction; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auction (auction_id, seller_id, title, description, initial_bid, exp_date, image_url, vector) FROM stdin;
1	1	asdf\n	asdf	1234	2012-12-12	rgsdg	\N
6	1	yogesh\n	rathod\n	243	\N	\N	\N
7	1	fdg	sadfsadf	222	2016-12-12	fdgdsfg	\N
\.


--
-- TOC entry 3115 (class 0 OID 16426)
-- Dependencies: 201
-- Data for Name: bidding; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.bidding (auction_id, user_id, bid_amount) FROM stdin;
\.


--
-- TOC entry 3112 (class 0 OID 16398)
-- Dependencies: 198
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (user_id, email, passroword, jwt_token, "Name") FROM stdin;
1	yrathod@gmail.com\n	12345	1wefsdaf	yogesh
\.


--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 199
-- Name: auction_auction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auction_auction_id_seq', 7, true);


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 197
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_user_id_seq', 1, false);


--
-- TOC entry 2983 (class 2606 OID 16419)
-- Name: auction auction_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT auction_pkey PRIMARY KEY (auction_id);


--
-- TOC entry 2979 (class 2606 OID 16408)
-- Name: user email; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 2981 (class 2606 OID 16406)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2984 (class 1259 OID 16425)
-- Name: fki_referUserId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_referUserId" ON public.auction USING btree (seller_id);


--
-- TOC entry 2985 (class 1259 OID 16442)
-- Name: fki_toTheUser; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_toTheUser" ON public.bidding USING btree (auction_id);


--
-- TOC entry 2986 (class 1259 OID 16448)
-- Name: fki_toUsr; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "fki_toUsr" ON public.bidding USING btree (user_id);


--
-- TOC entry 2987 (class 2606 OID 16420)
-- Name: auction referUserId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT "referUserId" FOREIGN KEY (seller_id) REFERENCES public."user"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2988 (class 2606 OID 16437)
-- Name: bidding toTheUser; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bidding
    ADD CONSTRAINT "toTheUser" FOREIGN KEY (auction_id) REFERENCES public.auction(auction_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2989 (class 2606 OID 16443)
-- Name: bidding toUsr; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bidding
    ADD CONSTRAINT "toUsr" FOREIGN KEY (user_id) REFERENCES public."user"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-08-28 16:51:51 IST

--
-- PostgreSQL database dump complete
--

