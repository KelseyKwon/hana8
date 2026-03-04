CREATE TABLE User
(
    id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME(6)  NULL,
    email     VARCHAR(255) NOT NULL,
    telno     VARCHAR(12)  NOT NULL,
    updatedAt DATETIME(6)  NULL,
    username  VARCHAR(31)  NOT NULL,
    CONSTRAINT uniq_User_email UNIQUE (email),
    CONSTRAINT unique_User_username_telno UNIQUE (username, telno)
) ENGINE=InnoDB;
