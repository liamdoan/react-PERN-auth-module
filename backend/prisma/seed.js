const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.role.upsert({
            where: {
                name: "admin"
            },
            update: {},
            create: {
                name: "admin"
            }
        });

        await prisma.role.upsert({
            where: {
                name: "manager"
            },
            update: {},
            create: {
                name: "manager"
            }
        });

        await prisma.role.upsert({
            where: {
                name: "user"
            },
            update: {},
            create: {
                name: "user"
            }
        });

        console.log("seeding done!")
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }  
}

main();
