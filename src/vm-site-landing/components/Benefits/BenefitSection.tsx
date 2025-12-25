"use client"
import { motion } from "framer-motion"

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/vm-site-landing/types";

interface Props {
    benefit: IBenefit;
}

// Removed complex variants - using simple whileInView pattern like FounderNote/CTA

const BenefitSection: React.FC<Props> = ({ benefit }: Props) => {
    const { title, description, bullets } = benefit;

    return (
        <section className="benefit-section">
            <motion.div
                className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="w-full text-center">
                    <motion.div
                        className="flex flex-col w-full"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle>
                            <h3 className="lg:max-w-2xl mx-auto">
                                {title}
                            </h3>
                        </SectionTitle>

                        <p className="mt-1.5 mx-auto leading-normal text-foreground-accent max-w-2xl">
                            {description}
                        </p>
                    </motion.div>

                    <div className="mx-auto w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {bullets.map((item, index) => (
                            <BenefitBullet key={index} title={item.title} icon={item.icon} description={item.description} index={index} iconColor={item.iconColor} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default BenefitSection