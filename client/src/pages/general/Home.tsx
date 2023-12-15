import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const sections = Array.from({ length: 6 }, (_, i) => {
    const [ref, setRef] = useState(null);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setOpacity(entry.intersectionRatio);
        },
        {
          threshold: Array.from({ length: 101 }, (_, i) => i * 0.01)
        }
      );

      if (ref) {
        observer.observe(ref);
      }

      return () => {
        if (ref) {
          observer.unobserve(ref);
        }
      };
    }, [ref]);

    return (
      <motion.div style={{ opacity }} transition={{ duration: 1 }} key={i}>
        <Box
          ref={setRef}
          sx={{
            width: "100%",
            padding: 2
          }}
          id={`section${i + 1}`}
        >
          <h2>{`Section ${i + 1}`}</h2>
          <p>{`This is section ${i + 1}.`}</p>
        </Box>
      </motion.div>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%"
      }}
    >
      <Container maxWidth="lg">{sections}</Container>
    </Box>
  );
};

export default Home;
