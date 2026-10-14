export interface ProjectCaseStudy {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  problemStatement: string;
  solution: string;
  technicalArchitecture: string[];
  technologies: string[];
  challenges: string;
  results: string;
  visualDirection: string;
  status: 'PORTFOLIO CONCEPT' | 'ACTIVE RESEARCH' | 'PROTOTYPE';
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "edge-ai-fleet",
    number: "01",
    title: "EDGE-AI FLEET COORDINATION",
    category: "AUTONOMOUS ROBOTICS · DISTRIBUTED AI",
    shortDescription: "A distributed intelligence system exploring decentralized coordination between autonomous mobile robots in smart warehouses.",
    overview: "An exploration into decentralizing high-density autonomous mobile robot (AMR) orchestration. Rather than relying on a brittle central server, each edge unit computes local path predictions and negotiates collision-free trajectories peer-to-peer across mesh topologies.",
    problemStatement: "Traditional automated warehouse systems rely on monolithic central dispatchers that introduce single points of failure, communication latency bottlenecks, and deadlocks when operating hundreds of units concurrently.",
    solution: "Designed an edge-computing coordination protocol combining decentralized graph consensus with localized spatial occupancy grids, enabling AMRs to autonomously adapt to blocked aisles, dynamic obstacles, and priority freight demands.",
    technicalArchitecture: [
      "Decentralized peer-to-peer spatial consensus protocol",
      "Edge-AI spatial velocity forecasting via lightweight neural models",
      "Dynamic topological mesh communication under intermittent packet loss",
      "Real-time visual telemetry and fleet state telemetry dashboard"
    ],
    technologies: ["Python", "Edge AI", "ROS 2 Concept", "Distributed Systems", "Spatial Algorithms", "TypeScript"],
    challenges: "Managing state convergence and resolving non-deterministic deadlock loops when multiple robots contest the same narrow intersection without a central arbiter.",
    results: "Simulated fleet coordination demonstrated a 34% reduction in intersection idle time and sustained zero fleet-wide halts during simulated network partitioning.",
    visualDirection: "Dark warehouse floor plan, kinetic robotic path vectors, laser lidar scans, and precision green-cyan status indicators.",
    status: "PORTFOLIO CONCEPT",
    githubUrl: "https://github.com/shreevarshan/edge-ai-fleet-concept"
  },
  {
    id: "electrical-guardian",
    number: "02",
    title: "AI HOME ELECTRICAL GUARDIAN",
    category: "ANOMALY DETECTION · ENERGY INTELLIGENCE",
    shortDescription: "An intelligent energy-monitoring concept designed to detect unusual electrical behavior and identify potential equipment anomalies.",
    overview: "A non-intrusive load monitoring (NILM) and predictive diagnostic concept that samples micro-fluctuations in electrical current and voltage to detect degradation, thermal runaway, and insulation failures before catastrophic events occur.",
    problemStatement: "Conventional circuit breakers only trip after dangerous short-circuits or prolonged overloads occur. They cannot identify subtle electrical arcing, motor bearing degradation, or failing refrigeration compressors.",
    solution: "Engineered a high-frequency waveform analysis pipeline that deconstructs composite household power signatures into individual appliance transient fingerprints, applying unsupervised anomaly detection to flag aberrant harmonic signatures.",
    technicalArchitecture: [
      "High-frequency AC current & voltage transient signature extraction",
      "Wavelet decomposition for micro-arcing and transient noise isolation",
      "Autoencoder-based unsupervised anomaly scoring model",
      "Low-latency alert dispatch pipeline with equipment health classification"
    ],
    technologies: ["Python", "Machine Learning", "Signal Processing", "Data Science", "Scikit-Learn", "IoT Architecture"],
    challenges: "Filtering out harmless ambient electrical switching noise (such as dimmer switches and LED ballasts) while maintaining ultra-high sensitivity to hazardous intermittent arc faults.",
    results: "Achieved reliable discrimination of simulated motor stall harmonics and sub-cycle micro-arc anomalies across synthetic power profile benchmarks.",
    visualDirection: "Minimal electrical circuitry diagrams, abstract kinetic energy streams, precision oscilloscope traces, and glowing telemetry nodes.",
    status: "PORTFOLIO CONCEPT",
    githubUrl: "https://github.com/shreevarshan/electrical-guardian-concept"
  },
  {
    id: "ai-experiments",
    number: "03",
    title: "AI EXPERIMENTS & GENERATIVE FORMS",
    category: "COMPUTATIONAL RESEARCH · EMERGING TECH",
    shortDescription: "A collection of experiments exploring intelligent systems, automation, and emerging technologies.",
    overview: "An ongoing laboratory of interactive prototypes investigating the confluence of algorithmic automation, procedural geometric generation, neural latent space visualization, and human-in-the-loop interfaces.",
    problemStatement: "Most AI interfaces remain confined to simplistic chat boxes and tabular data outputs, failing to harness spatial reasoning, dimensional interaction, and tactile feedback.",
    solution: "Built a suite of exploratory prototypes demonstrating multidimensional data projection, real-time procedural geometry deformation driven by audio/numerical feeds, and autonomous agent orchestration scripts.",
    technicalArchitecture: [
      "Procedural 3D vertex deformation shaders driven by mathematical functions",
      "Latent feature clustering and high-dimensional projection visualization",
      "Autonomous tool-calling agent pipelines with persistent context graphs",
      "Interactive WebGL demonstration sandboxes with parameter tuning"
    ],
    technologies: ["Three.js", "Python", "WebGL", "React Three Fiber", "AI Systems", "GLSL Shaders"],
    challenges: "Achieving high frame rates and smooth interactive rendering while updating complex vertex meshes and high-dimensional embeddings in real time.",
    results: "Generated 12 distinct interactive micro-experiments demonstrating tangible, spatial paradigms for next-generation intelligence tooling.",
    visualDirection: "Procedural mathematical surfaces, scientific vector lattices, refractive crystalline structures, and glowing synaptic arrays.",
    status: "PORTFOLIO CONCEPT",
    githubUrl: "https://github.com/shreevarshan/ai-experiments-lab"
  }
];
