import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class ProductViewer {
    constructor(container) {
        this.container = container;
        this.modelUrl = container.dataset.modelUrl; // Passed via data attribute
        this.imageUrl = container.dataset.imageUrl; // Passed via data attribute
        this.isInteractive = container.dataset.interactive === 'true';
        this.loadModel();
    }

    loadModel() {
        this.scene = new THREE.Scene();
        
        // Setup Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 5);

        // Setup Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x8b5cf6, 2, 50); // Purple accent light
        pointLight.position.set(-5, 0, 0);
        this.scene.add(pointLight);

        // Controls
        if (this.isInteractive) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enableZoom = true;
        }

        this.createFallbackModel();

        // Handle Resize
        window.addEventListener('resize', () => {
            if(!this.container || !this.container.clientWidth) return;
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });

        // Start Animation Loop
        this.animate();
        this.container.classList.add('loaded'); // Hide placeholder
    }

    createFallbackModel() {
        const geometry = new THREE.PlaneGeometry(3, 3);
        let material;
        if (this.imageUrl) {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(this.imageUrl);
            // texture.colorSpace = THREE.SRGBColorSpace; // Optional
            
            material = new THREE.MeshStandardMaterial({ 
                map: texture,
                roughness: 0.2,
                metalness: 0.1,
                transparent: true,
                side: THREE.DoubleSide
            });
        } else {
            material = new THREE.MeshStandardMaterial({ 
                color: 0x8b5cf6,
                roughness: 0.2,
                metalness: 0.8
            });
        }
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.mesh && !this.isInteractive) {
            this.mesh.rotation.y += 0.005; // Auto rotate for non-interactive cards
            this.mesh.rotation.x += 0.002;
        }

        if (this.isInteractive && this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize all viewers on page load
document.addEventListener('DOMContentLoaded', () => {
    const viewers = document.querySelectorAll('.canvas-container');
    viewers.forEach(v => new ProductViewer(v));
});
