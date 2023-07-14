DROP TABLE IF EXISTS characters CASCADE;
DROP TABLE IF EXISTS combos;

CREATE TABLE characters(
    char_id SERIAL PRIMARY KEY,
    char_name VARCHAR (50),
    char_img TEXT
);

CREATE TABLE combos(
    combo_id SERIAL PRIMARY KEY,
    combo_inputs VARCHAR(255),
    combo_dmg INT,
    combo_resources VARCHAR (50),
    char_id INT,
    CONSTRAINT fk_char_id
        FOREIGN KEY(char_id)
        REFERENCES characters(char_id)
        ON DELETE CASCADE
);