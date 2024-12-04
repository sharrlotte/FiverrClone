-- CreateTable
CREATE TABLE "RoleAuthority" (
    "roleId" INTEGER NOT NULL,
    "authorityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "RoleAuthority_pkey" PRIMARY KEY ("roleId","authorityId")
);

-- CreateIndex
CREATE INDEX "RoleAuthority_authorityId_idx" ON "RoleAuthority"("authorityId");

-- CreateIndex
CREATE INDEX "RoleAuthority_roleId_idx" ON "RoleAuthority"("roleId");

-- AddForeignKey
ALTER TABLE "RoleAuthority" ADD CONSTRAINT "RoleAuthority_authorityId_fkey" FOREIGN KEY ("authorityId") REFERENCES "Authority"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RoleAuthority" ADD CONSTRAINT "RoleAuthority_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
