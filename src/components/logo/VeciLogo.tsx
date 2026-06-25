"use client";

import { motion } from "framer-motion";

export default function VeciLogo() {
  return (
    
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="w-[420px] md:w-[520px]"
      >
        <svg
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* SKY */}
          <motion.circle
            cx="250"
            cy="250"
            r="210"
            fill="#12C8F7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />

          {/* SUN */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            style={{ transformOrigin: "120px 120px" }}
          >
            <circle cx="120" cy="120" r="25" fill="#FFD93D" />

            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI) / 4;
              const x1 = 120 + Math.cos(angle) * 40;
              const y1 = 120 + Math.sin(angle) * 40;
              const x2 = 120 + Math.cos(angle) * 58;
              const y2 = 120 + Math.sin(angle) * 58;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#FFD93D"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>

          {/* CLOUDS */}
          <motion.g
            animate={{ x: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            fill="#fff"
          >
            <circle cx="380" cy="120" r="30" />
            <circle cx="415" cy="120" r="38" />
            <circle cx="450" cy="125" r="28" />
            <rect x="375" y="120" width="80" height="35" />
          </motion.g>

          <motion.g
            animate={{ x: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            fill="#fff"
          >
            <circle cx="95" cy="190" r="18" />
            <circle cx="120" cy="190" r="22" />
            <circle cx="145" cy="195" r="16" />
            <rect x="90" y="190" width="55" height="18" />
          </motion.g>

          {/* MOUNTAINS */}
          <motion.g
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {/* Left Mountain */}
            <path d="M20 320 L130 200 L230 320 Z" fill="#08A35A" />
            <path
              d="M90 240 L130 200 L170 240 L145 230 L130 270 L115 230 Z"
              fill="#ffffff"
            />

            {/* Main Mountain */}
            <path d="M120 310 L280 120 L430 310 Z" fill="#1275E0" />
            <path
              d="M220 180 L280 120 L340 180 L310 170 L280 230 L250 170 Z"
              fill="#ffffff"
            />

            {/* Small Mountain */}
            <path d="M270 310 L370 200 L470 310 Z" fill="#2490F5" />
            <path
              d="M330 235 L370 200 L410 235 L390 228 L370 255 L350 228 Z"
              fill="#ffffff"
            />

            {/* Right Mountain */}
            <path d="M350 320 L470 190 L560 320 Z" fill="#37A8FF" />
            <path
              d="M430 235 L470 190 L510 235 L490 228 L470 260 L450 228 Z"
              fill="#ffffff"
            />
          </motion.g>

          {/* HILLS */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            <path
              d="M0 350 Q120 260 240 350 T500 350 V500 H0 Z"
              fill="#37D339"
            />

            <path
              d="M0 390 Q120 300 240 390 T500 390 V500 H0 Z"
              fill="#12B84D"
            />

            <path
              d="M0 430 Q140 340 260 430 T520 430 V500 H0 Z"
              fill="#0B9641"
            />
          </motion.g>

          {/* TREES */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            fill="#087B39"
          >
            <path d="M70 390 L85 350 L100 390 Z" />
            <rect x="82" y="390" width="6" height="18" />

            <path d="M120 360 L140 310 L160 360 Z" />
            <rect x="137" y="360" width="6" height="18" />

            <path d="M390 380 L405 340 L420 380 Z" />
            <rect x="402" y="380" width="6" height="18" />

            <path d="M445 350 L465 300 L485 350 Z" />
            <rect x="462" y="350" width="6" height="18" />
          </motion.g>

          {/* STORE */}
          <motion.g
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            {/* SHADOW */}
            <motion.ellipse
              cx="250"
              cy="440"
              rx="150"
              ry="18"
              fill="rgba(0,0,0,0.15)"
              animate={{ scaleX: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
            />

            {/* STORE BODY */}
            <rect
              x="150"
              y="250"
              width="220"
              height="150"
              rx="8"
              fill="#FFD400"
              stroke="#0B1E8A"
              strokeWidth="8"
            />

            {/* TOP SIGN */}
            <rect
              x="140"
              y="180"
              width="240"
              height="90"
              rx="20"
              fill="#ffffff"
              stroke="#0B1E8A"
              strokeWidth="8"
            />

            {/* TEXT */}
            <motion.text
              x="260"
              y="240"
              textAnchor="middle"
              fontSize="60"
              fontWeight="900"
              fontFamily="Arial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1,
                duration: 0.6,
              }}
            >
              <tspan fill="#8A2BE2">V</tspan>
              <tspan fill="#FF6B00">E</tspan>
              <tspan fill="#22C55E">C</tspan>
              <tspan fill="#00BFFF">I</tspan>
            </motion.text>

            {/* AWNING */}
            <path
              d="M140 270 L380 270 L355 320 L165 320 Z"
              fill="#ffffff"
              stroke="#0B1E8A"
              strokeWidth="6"
            />

            {/* STRIPES */}
            {[
              [155, 185],
              [205, 235],
              [255, 285],
              [305, 335],
              [350, 380],
            ].map(([x1, x2], i) => (
              <motion.path
                key={i}
                d={`M${x1} 270 L${x2} 270 L${x2 - 10} 320 L${
                  x1 - 10
                } 320 Z`}
                fill="#FF2D55"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: i * 0.15,
                }}
              />
            ))}

            {/* WINDOW */}
            <rect
              x="180"
              y="340"
              width="95"
              height="75"
              rx="6"
              fill="#7DDCFF"
              stroke="#0B1E8A"
              strokeWidth="7"
            />

            {/* PRODUCTS */}
            <motion.rect
              x="195"
              y="375"
              width="25"
              height="28"
              fill="#FF6B00"
              animate={{ y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
            />

            <motion.rect
              x="230"
              y="360"
              width="28"
              height="43"
              fill="#22C55E"
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
            />

            <motion.rect
              x="265"
              y="380"
              width="20"
              height="23"
              fill="#8A2BE2"
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
            />

            {/* DOOR */}
            <motion.rect
              x="300"
              y="335"
              width="90"
              height="100"
              rx="6"
              fill="#7DDCFF"
              stroke="#0B1E8A"
              strokeWidth="7"
              whileHover={{
                scale: 1.03,
              }}
            />

            <circle cx="320" cy="385" r="5" fill="#0B1E8A" />

            {/* PLANT */}
            <motion.g
              animate={{ rotate: [-2, 2, -2] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              style={{
                transformOrigin: "125px 420px",
              }}
            >
              <rect
                x="105"
                y="380"
                width="40"
                height="50"
                rx="4"
                fill="#0066FF"
              />

              <circle cx="125" cy="360" r="25" fill="#22C55E" />
              <circle cx="108" cy="372" r="18" fill="#22C55E" />
              <circle cx="140" cy="374" r="18" fill="#22C55E" />
            </motion.g>

            {/* SIDE SIGN */}
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
            >
              <rect
                x="395"
                y="360"
                width="70"
                height="90"
                rx="8"
                fill="#8A2BE2"
                stroke="#0B1E8A"
                strokeWidth="7"
              />

              <g fill="#ffffff">
                <circle cx="420" cy="415" r="5" />
                <circle cx="440" cy="415" r="5" />

                <path
                  d="M410 390 H445 L438 405 H415 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>
  );
}