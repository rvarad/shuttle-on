import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
	const neonConnectionPool = new Pool({
		connectionString: process.env.DATABASE_URL,
	})
	const adapter = new PrismaNeon(neonConnectionPool)
	return new PrismaClient({ adapter })
}

declare const globalThis: {
	prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma
