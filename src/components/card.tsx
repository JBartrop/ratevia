import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  actions?: ReactNode; 
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, actions, children, className }) => {
    return(
        <section>
            <div className={`bg-[rgb(var(--card))] rounded-lg shadow-md border border-[rgb(var(--lines))]/50 p-4 ${className ?? ""}`}>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-[rgb(var(--header-text))]">{title}</h2>
                        {description && (
                            <p className="text-sm text-[rgb(var(--muted))]">{description}</p>
                        )}
                    </div>
                    {actions && <div className="flex gap-2">{actions}</div>}
                </div>

                <div>{children}</div>
            </div>
        </section>
    )
}

export default Card;