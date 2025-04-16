CREATE TABLE jokes (
    id BIGSERIAL PRIMARY KEY,
    setup TEXT NOT NULL,
    punchline TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 

INSERT INTO jokes (setup, punchline) VALUES
('为什么程序员不喜欢大自然？', '因为有太多的bug'),
('你怎么称呼一个没有牙齿的熊？', '果冻熊！'),
('为什么稻草人获得了奖项？', '因为他在自己的领域很出色！'),
('你怎么称呼一个假的意大利面？', '冒牌面！'),
('为什么数学书看起来很伤心？', '因为它有太多的问题'); 