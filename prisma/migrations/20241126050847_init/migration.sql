/*
  Warnings:

  - The primary key for the `asa_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SubmitTime` on the `asa_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UserName]` on the table `asa_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `asa_users` DROP PRIMARY KEY,
    DROP COLUMN `SubmitTime`,
    MODIFY `ID` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ID`);

-- CreateTable
CREATE TABLE `tanks` (
    `ID` BIGINT NOT NULL AUTO_INCREMENT,
    `TankNumber` VARCHAR(191) NOT NULL,
    `TankOwner` VARCHAR(191) NOT NULL,
    `TruckPlateNumber` VARCHAR(191) NULL,
    `TruckTransitNumber` VARCHAR(191) NULL,
    `TruckCaputageCompany` VARCHAR(191) NULL,
    `DriverFullName` VARCHAR(191) NULL,
    `DriverLisenceNumber` VARCHAR(191) NULL,
    `DriverPhoneNumber` VARCHAR(191) NULL,
    `PsiTest` DATETIME(3) NULL,
    `WhiteTest` DATETIME(3) NULL,
    `Supervisor` VARCHAR(191) NULL,
    `Creator` VARCHAR(191) NOT NULL,
    `SubmitDateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tanks_TankNumber_key`(`TankNumber`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `asa_users_UserName_key` ON `asa_users`(`UserName`);
