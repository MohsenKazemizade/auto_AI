-- CreateTable
CREATE TABLE `asa_users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `AccessLevel` VARCHAR(191) NOT NULL,
    `Owner` VARCHAR(191) NULL,
    `PhoneNumber` VARCHAR(191) NULL,
    `SubmitDate` DATETIME(3) NOT NULL,
    `SubmitTime` DATETIME(3) NOT NULL,
    `RepresentativeCode` VARCHAR(191) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
