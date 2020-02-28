ALTER TABLE ONLY public.auction
    ADD CONSTRAINT auction_pkey PRIMARY KEY (auction_id);


ALTER TABLE ONLY public.bidding
    ADD CONSTRAINT bidding_pkey PRIMARY KEY (bid_id);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);

CREATE INDEX fki_frk_auction ON public.bidding USING btree (auction_id);

CREATE INDEX fki_frn_user ON public.bidding USING btree (user_id);

CREATE INDEX "fki_referUserId" ON public.auction USING btree (seller_id);

CREATE INDEX fki_wn_fn ON public.auction USING btree (winner);

ALTER TABLE ONLY public.bidding
    ADD CONSTRAINT frk_auction FOREIGN KEY (auction_id) REFERENCES public.auction(auction_id);

ALTER TABLE ONLY public.bidding
    ADD CONSTRAINT frn_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT sn_fn FOREIGN KEY (seller_id) REFERENCES public.users(user_id);

ALTER TABLE ONLY public.auction
    ADD CONSTRAINT wn_fn FOREIGN KEY (winner) REFERENCES public.users(user_id);
