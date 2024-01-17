-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('open', 'paused', 'complete');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'reject', 'accept');

-- CreateEnum
CREATE TYPE "Career" AS ENUM ('fullstack', 'frontend', 'backend');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('clt', 'pj', 'est');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "label" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "cppj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'open',

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "linkedinLink" TEXT,
    "githubLink" TEXT,
    "anexCV" TEXT,
    "career" "Career" NOT NULL,
    "contractType" "ContractType" NOT NULL,
    "allowRemoteWork" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "functionName" TEXT NOT NULL,
    "initalDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3),
    "isCurrentJob" BOOLEAN NOT NULL DEFAULT false,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "curriculumId" INTEGER NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CurriculumToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExperienceToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_cppj_key" ON "Company"("cppj");

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_jobId_key" ON "Application"("userId", "jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Curriculum_userId_key" ON "Curriculum"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToSkill_AB_unique" ON "_JobToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToSkill_B_index" ON "_JobToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CurriculumToSkill_AB_unique" ON "_CurriculumToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_CurriculumToSkill_B_index" ON "_CurriculumToSkill"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExperienceToSkill_AB_unique" ON "_ExperienceToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ExperienceToSkill_B_index" ON "_ExperienceToSkill"("B");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToSkill" ADD CONSTRAINT "_JobToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToSkill" ADD CONSTRAINT "_JobToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurriculumToSkill" ADD CONSTRAINT "_CurriculumToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurriculumToSkill" ADD CONSTRAINT "_CurriculumToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToSkill" ADD CONSTRAINT "_ExperienceToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceToSkill" ADD CONSTRAINT "_ExperienceToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
