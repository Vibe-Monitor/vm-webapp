import { motion } from "framer-motion"

import { IBenefitBullet } from "@/vm-site-landing/types"

interface BenefitBulletProps extends IBenefitBullet {
    index: number;
}

const BenefitBullet: React.FC<BenefitBulletProps> = ({ title, description, icon, index, iconColor = "text-primary" }) => {
    return (
        <motion.div
            className="flex flex-col items-center text-center p-6 border-2 border-gray-100 rounded-xl bg-white relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                transition: { duration: 0.25, ease: "easeOut" }
            }}
        >
            {/* Hover gradient background - uses Tailwind group-hover */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: 0 }}
            />

            <div
                className={`relative z-10 flex justify-center items-center mb-4 ${iconColor} [&>svg]:w-[28px] [&>svg]:h-[28px] w-14 h-14 rounded-xl bg-gray-50 transition-all duration-200`}
            >
                {icon}
            </div>
            <div className="relative z-10">
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#171717' }}>
                    {title}
                </h4>
                <p className="text-base" style={{ color: '#454545' }}>
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default BenefitBullet