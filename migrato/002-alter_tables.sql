ALTER TABLE ONLY public.auction ALTER COLUMN auction_id SET DEFAULT nextval('public.auction_auction_id_seq'::regclass);

ALTER TABLE ONLY public.bidding ALTER COLUMN bid_id SET DEFAULT nextval('public.bidding_bid_id_seq'::regclass);

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);

