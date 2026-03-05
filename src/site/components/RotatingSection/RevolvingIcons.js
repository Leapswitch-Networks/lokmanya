import React, { useEffect, useRef } from "react";
import "./RotatingIcons.css";
import Inner1 from "@/site/assets/images/rotating-circle/inner-1.svg";
import Inner2 from "@/site/assets/images/rotating-circle/inner-2.svg";
import Inner3 from "@/site/assets/images/rotating-circle/inner-3.svg";
import Inner4 from "@/site/assets/images/rotating-circle/inner-4.svg";
import Outer1 from "@/site/assets/images/rotating-circle/outer-1.svg";
import Outer2 from "@/site/assets/images/rotating-circle/outer-2.svg";
import Outer3 from "@/site/assets/images/rotating-circle/outer-3.svg";
import Outer4 from "@/site/assets/images/rotating-circle/outer-4.svg";
import CenterImg from "@/site/assets/images/rotating-circle/rotating-center.webp";
import Image from "next/image";

const RotatingIcons = () => {
    const outerRefs = useRef([]);
    const innerRefs = useRef([]);

    const outerIcons = [
        { Icon: Outer1, title: "Rheumatoid Arthritis", desc: "This autoimmune condition causes chronic inflammation in the knee joint, often leading to damage that affects daily movement. With years of experience treating complex cases, he offers effective surgical solutions when medical management is no longer sufficient." },
        { Icon: Outer2, title: "Cartilage Damage", desc: "Whether due to injury or aging, damaged cartilage in the knee can cause locking, instability, and pain. Dr. Vaidya offers both minimally invasive treatments and joint replacement procedures depending on the extent of degeneration." },
        { Icon: Outer3, title: "Osteoarthritis of the Knee", desc: "One of the most common degenerative conditions, osteoarthritis leads to gradual cartilage loss, resulting in joint pain, stiffness, and reduced mobility. He uses advanced diagnostics and robotic-assisted procedures to offer long-term relief, an approach that consistently places him among the best knee replacement surgeons in Pune." },
        { Icon: Outer4, title: "Ligament Injuries (ACL, PCL, Meniscus Tears)", desc: "These injuries are common in athletes and active individuals. Dr. Vaidya treats ligament tears through advanced arthroscopic surgery, restoring knee strength and functionality with precision-led care." },
    ];

    const innerIcons = [
        { Icon: Inner1, title: "Failed Previous Knee Surgeries", desc: "In cases where earlier knee surgeries have not yielded lasting results, Dr. Vaidya performs revision surgeries using modern techniques designed for improved stability and better long-term outcomes." },
        { Icon: Inner2, title: "Knee Deformities ", desc: "Structural misalignments can lead to early joint wear and altered walking posture. Dr. Vaidya treats such conditions through precise realignment or, when required, corrective joint replacement, backed by the expertise of one of Pune’s most trusted orthopedic surgeons." },
        { Icon: Inner3, title: "Post-Traumatic Arthritis", desc: "Often resulting from fractures, dislocations, or ligament injuries, this condition can gradually wear down the joint and limit mobility. Dr. Vaidya, regarded as one of the best joint replacement surgeons in Pune, takes a case-specific approach, offering advanced surgical options when conservative treatments are no longer effective." },
        { Icon: Inner4, title: "Severe Knee Pain and Limited Mobility", desc: "For patients whose pain interferes with daily activities and no longer responds to conservative treatments, knee replacement may be the best option. Dr. Vaidya’s surgical expertise, patient-focused care, and use of the latest technology are key reasons why many consider him among the top knee replacement surgeons in Pune." },
    ];

    useEffect(() => {
        const updateAngles = (refs) => {
            refs.forEach((ref) => {
                if (!ref) return;
                const infoCard = ref.querySelector(".info-card");
                const parentCircle = ref.parentElement;
                const computed = window.getComputedStyle(parentCircle);
                const matrix = new DOMMatrixReadOnly(computed.transform);
                const angle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);

                // Get center x of icon and circle to decide side
                const iconRect = ref.getBoundingClientRect();
                const circleRect = parentCircle.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const circleCenterX = circleRect.left + circleRect.width / 2;

                const side = iconCenterX < circleCenterX ? 'left' : 'right';
                ref.setAttribute("data-side", side);

                infoCard.style.transform = `translateY(-50%) translateX(${side === 'left' ? '-25px' : '25px'}) rotate(${-angle}deg)`;
            });
        };
        const interval = setInterval(() => {
            updateAngles(outerRefs.current);
            updateAngles(innerRefs.current);
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="circle-container">
            <div className="circle outer">
                {outerIcons.map(({ Icon, title, desc }, idx) => (
                    <div className="icon" key={idx} ref={(el) => (outerRefs.current[idx] = el)}>
                        <Image src={Icon} alt={title} className="icon-image" width={70} height={70} />
                        <div className="info-card">
                            <div className="info-tag">{title}</div>
                            <div className="info-content">
                                <p>{desc}</p>
                                {/* <div className="info-image">
                                    <Image src={Icon} alt={title} width={40} height={40} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="circle inner">
                {innerIcons.map(({ Icon, title, desc }, idx) => (
                    <div className="icon" key={idx} ref={(el) => (innerRefs.current[idx] = el)}>
                        <Image src={Icon} alt={title} className="icon-image" width={70} height={70} />
                        <div className="info-card">
                            <div className="info-tag">{title}</div>
                            <div className="info-content">
                                <p>{desc}</p>
                                {/* <div className="info-image">
                                    <Image src={Icon} alt={title} width={40} height={40} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="center-image">
                <Image src={CenterImg} alt="Narendra Vaidya" width={250} height={250} />
            </div>
        </div>
    );
};

export default RotatingIcons;
