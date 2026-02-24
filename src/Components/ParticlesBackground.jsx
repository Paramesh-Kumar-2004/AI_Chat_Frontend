import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";



const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) return null;

    return (
        <div style={styles.wrapper}>
            <Particles
                id="tsparticles"
                options={{
                    background: { color: "#000" },
                    fpsLimit: 60,
                    particles: {
                        number: { value: 350, density: { enable: true, area: 800 } },
                        color: { value: "#ffffff" },
                        // color: { value: "#ffffff" },
                        shape: { type: "circle" },
                        opacity: { value: 0.6 },
                        size: { value: { min: 1, max: 3 } },
                        links: {
                            enable: true,
                            distance: 150,
                            color: "#2b87f0",
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            enable: true,
                            speed: 4,
                            outModes: { default: "bounce" },
                        },
                    },
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "grab" },
                            onClick: { enable: true, mode: "push" },
                        },
                        modes: {
                            grab: { distance: 200, links: { opacity: 0.7 } },
                            push: { quantity: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};

const styles = {
    wrapper: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        zIndex: -1,
    },
};

export default ParticlesBackground;