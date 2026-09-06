
CREATE TABLE blogs 
(
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    description  TEXT NOT NULL,
    author_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE blogs ADD COLUMN is_Delelte BOOLEAN DEFAULT false;
ALTER TABLE blogs ADD COLUMN updata_at TIMESTAMP DEFAULT NOW();

INSERT INTO blogs (title, description, author_id)
VALUES
('Blog 1', 'The first blog', 1),
('Blog 2', 'The second blog', 2),
('Blog 3', 'The third blog', 3),
('Blog 4', 'The fourth blog', 4),
('Blog 5', 'The fifth blog', 5),
('Blog 6', 'The sixth blog', 6),
('Blog 7', 'The seventh blog', 7),
('Blog 8', 'The eighth blog', 8),
('Blog 9', 'The ninth blog', 9),
('Blog 10', 'The tenth blog', 10);

SELECT * FROM blogs;