import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useApp } from "../context/AppContext";

interface Country {
  id: string;
  name: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  agencies: number;
  branches: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface Agency {
  id: string;
  name: string;
  country: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  branches: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface Branch {
  id: string;
  name: string;
  agency: string;
  country: string;
  region: string;
  totalUsers: number;
  activeUsers: number;
  totalPoints: number;
  topPerformer: {
    id: string;
    email: string;
    points: number;
  };
}

interface User {
  id: string;
  email: string;
  agency: string;
  branch: string;
  country: string;
  region: string;
  points: number;
  level: number;
  completedStations: number;
  status: 'activo' | 'inactivo';
  lastActivity: string;
  joinDate: string;
}

export default function GlobalLocationsPage() {
  const { currentUserRole } = useApp();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'countries' | 'agencies' | 'users'>('countries');
  const [countries, setCountries] = useState<Country[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLocationData();
  }, []);

  const loadLocationData = async () => {
    setLoading(true);
    try {
      // Verificar cache
      const cachedCountries = localStorage.getItem('globalCountries');
      const cachedAgencies = localStorage.getItem('globalAgencies');
      const cachedBranches = localStorage.getItem('globalBranches');
      const cachedUsers = localStorage.getItem('globalUsers');
      
      if (cachedCountries && cachedAgencies && cachedBranches && cachedUsers) {
        setCountries(JSON.parse(cachedCountries));
        setAgencies(JSON.parse(cachedAgencies));
        setBranches(JSON.parse(cachedBranches));
        setUsers(JSON.parse(cachedUsers));
        setLoading(false);
        return;
      }

      // Cargar datos demo
      const demoCountries: Country[] = [
        {
          id: 'PA',
          name: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 45,
          activeUsers: 38,
          totalPoints: 125000,
          agencies: 3,
          branches: 8,
          topPerformer: {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            points: 1500
          }
        },
        {
          id: 'CR',
          name: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 32,
          activeUsers: 28,
          totalPoints: 89000,
          agencies: 2,
          branches: 5,
          topPerformer: {
            id: 'M002',
            email: 'carlos.lopez@luismorenos.com',
            points: 1350
          }
        },
        {
          id: 'GT',
          name: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 28,
          activeUsers: 22,
          totalPoints: 67000,
          agencies: 2,
          branches: 4,
          topPerformer: {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            points: 1100
          }
        },
        {
          id: 'SV',
          name: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 20,
          activeUsers: 16,
          totalPoints: 45000,
          agencies: 1,
          branches: 3,
          topPerformer: {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            points: 850
          }
        },
        {
          id: 'HN',
          name: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 14,
          totalPoints: 38000,
          agencies: 1,
          branches: 2,
          topPerformer: {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            points: 720
          }
        },
        {
          id: 'NI',
          name: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 12,
          totalPoints: 30000,
          agencies: 1,
          branches: 2,
          topPerformer: {
            id: 'M008',
            email: 'pedro.sanchez@luismorenos.com',
            points: 600
          }
        }
      ];

      const demoAgencies: Agency[] = [
        {
          id: 'AG001',
          name: 'Agencia Panamá Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 25,
          activeUsers: 22,
          totalPoints: 75000,
          branches: 4,
          topPerformer: {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            points: 1500
          }
        },
        {
          id: 'AG002',
          name: 'Agencia Panamá Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 12,
          activeUsers: 10,
          totalPoints: 35000,
          branches: 2,
          topPerformer: {
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            points: 1250
          }
        },
        {
          id: 'AG003',
          name: 'Agencia Panamá Sur',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 8,
          activeUsers: 6,
          totalPoints: 15000,
          branches: 2,
          topPerformer: {
            id: 'M005',
            email: 'sofia.rodriguez@luismorenos.com',
            points: 980
          }
        },
        {
          id: 'AG004',
          name: 'Agencia Costa Rica',
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 12,
          activeUsers: 10,
          totalPoints: 40000,
          branches: 2,
          topPerformer: {
            id: 'M009',
            email: 'patricia.mendez@luismorenos.com',
            points: 1400
          }
        },
        {
          id: 'AG005',
          name: 'Agencia Costa Rica Norte',
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 12,
          activeUsers: 10,
          totalPoints: 34000,
          branches: 2,
          topPerformer: {
            id: 'M009',
            email: 'diego.morales@luismorenos.com',
            points: 800
          }
        },
        {
          id: 'AG006',
          name: 'Agencia Guatemala',
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 15,
          totalPoints: 42000,
          branches: 3,
          topPerformer: {
            id: 'M004',
            email: 'juan.perez@luismorenos.com',
            points: 1100
          }
        },
        {
          id: 'AG007',
          name: 'Agencia Guatemala Sur',
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 10,
          activeUsers: 7,
          totalPoints: 25000,
          branches: 1,
          topPerformer: {
            id: 'M010',
            email: 'lucia.hernandez@luismorenos.com',
            points: 650
          }
        },
        {
          id: 'AG008',
          name: 'Agencia El Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 20,
          activeUsers: 16,
          totalPoints: 45000,
          branches: 3,
          topPerformer: {
            id: 'M006',
            email: 'luis.torres@luismorenos.com',
            points: 850
          }
        },
        {
          id: 'AG009',
          name: 'Agencia Honduras',
          country: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 18,
          activeUsers: 14,
          totalPoints: 38000,
          branches: 2,
          topPerformer: {
            id: 'M007',
            email: 'carmen.silva@luismorenos.com',
            points: 720
          }
        },
        {
          id: 'AG010',
          name: 'Agencia Nicaragua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 12,
          totalPoints: 30000,
          branches: 2,
          topPerformer: {
            id: 'M008',
            email: 'pedro.sanchez@luismorenos.com',
            points: 600
          }
        }
      ];

      const demoBranches: Branch[] = [
        {
          id: 'BR001',
          name: 'Sucursal Centro',
          agency: 'Agencia Panamá Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 15,
          activeUsers: 14,
          totalPoints: 45000,
          topPerformer: {
            id: 'M001',
            email: 'ana.martinez@luismorenos.com',
            points: 1500
          }
        },
        {
          id: 'BR002',
          name: 'Sucursal Norte',
          agency: 'Agencia Panamá Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 10,
          activeUsers: 8,
          totalPoints: 30000,
          topPerformer: {
            id: 'M003',
            email: 'maria.garcia@luismorenos.com',
            points: 1250
          }
        },
        {
          id: 'BR003',
          name: 'Sucursal Sur',
          agency: 'Agencia Panamá Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          totalUsers: 8,
          activeUsers: 7,
          totalPoints: 25000,
          topPerformer: {
            id: 'M005',
            email: 'sofia.rodriguez@luismorenos.com',
            points: 950
          }
        },
        {
          id: 'BR004',
          name: 'Sucursal San José',
          agency: 'Agencia Costa Rica',
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 8,
          activeUsers: 7,
          totalPoints: 28000,
          topPerformer: {
            id: 'M009',
            email: 'patricia.mendez@luismorenos.com',
            points: 1400
          }
        },
        {
          id: 'BR004B',
          name: 'Sucursal Cartago',
          agency: 'Agencia Costa Rica',
          country: 'Costa Rica',
          region: 'Centroamérica',
          totalUsers: 4,
          activeUsers: 3,
          totalPoints: 12000,
          topPerformer: {
            id: 'M011',
            email: 'lucia.herrera@luismorenos.com',
            points: 1000
          }
        },
        {
          id: 'BR005',
          name: 'Sucursal Centro',
          agency: 'Agencia Guatemala',
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 8,
          activeUsers: 7,
          totalPoints: 25000,
          topPerformer: {
            id: 'M012',
            email: 'fernando.gomez@luismorenos.com',
            points: 1300
          }
        },
        {
          id: 'BR006',
          name: 'Sucursal Quetzaltenango',
          agency: 'Agencia Guatemala',
          country: 'Guatemala',
          region: 'Centroamérica',
          totalUsers: 4,
          activeUsers: 3,
          totalPoints: 12000,
          topPerformer: {
            id: 'M014',
            email: 'miguel.vargas@luismorenos.com',
            points: 800
          }
        },
        {
          id: 'BR007',
          name: 'Sucursal San Salvador',
          agency: 'Agencia El Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          totalUsers: 6,
          activeUsers: 5,
          totalPoints: 15000,
          topPerformer: {
            id: 'M015',
            email: 'elena.morales@luismorenos.com',
            points: 1100
          }
        },
        {
          id: 'BR008',
          name: 'Sucursal Tegucigalpa',
          agency: 'Agencia Honduras',
          country: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 4,
          activeUsers: 3,
          totalPoints: 12000,
          topPerformer: {
            id: 'M017',
            email: 'gloria.mendoza@luismorenos.com',
            points: 900
          }
        },
        {
          id: 'BR009',
          name: 'Sucursal San Pedro Sula',
          agency: 'Agencia Honduras',
          country: 'Honduras',
          region: 'Centroamérica',
          totalUsers: 3,
          activeUsers: 2,
          totalPoints: 8000,
          topPerformer: {
            id: 'M018',
            email: 'hugo.espinoza@luismorenos.com',
            points: 650
          }
        },
        {
          id: 'BR010',
          name: 'Sucursal Managua',
          agency: 'Agencia Nicaragua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 4,
          activeUsers: 3,
          totalPoints: 10000,
          topPerformer: {
            id: 'M019',
            email: 'valeria.ortiz@luismorenos.com',
            points: 800
          }
        },
        {
          id: 'BR011',
          name: 'Sucursal León',
          agency: 'Agencia Nicaragua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          totalUsers: 2,
          activeUsers: 1,
          totalPoints: 5000,
          topPerformer: {
            id: 'M020',
            email: 'oscar.sandoval@luismorenos.com',
            points: 550
          }
        }
      ];

      const demoUsers: User[] = [
        // Panamá - Agencia Panamá Centro
        {
          id: 'M001',
          email: 'ana.martinez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1500,
          level: 6,
          completedStations: 12,
          status: 'activo',
          lastActivity: 'Hace 5 horas',
          joinDate: '2024-01-15'
        },
        {
          id: 'M002',
          email: 'carlos.lopez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Centro',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1350,
          level: 5,
          completedStations: 11,
          status: 'activo',
          lastActivity: 'Hace 4 horas',
          joinDate: '2024-02-01'
        },
        {
          id: 'M003',
          email: 'maria.garcia@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1250,
          level: 5,
          completedStations: 10,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          joinDate: '2024-01-20'
        },
        {
          id: 'M004',
          email: 'juan.perez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1100,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 3 horas',
          joinDate: '2024-02-10'
        },
        {
          id: 'M005',
          email: 'sofia.rodriguez@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Sur',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 950,
          level: 4,
          completedStations: 8,
          status: 'activo',
          lastActivity: 'Hace 1 día',
          joinDate: '2024-01-25'
        },
        {
          id: 'M006',
          email: 'luis.torres@luismorenos.com',
          agency: 'Agencia Panamá Centro',
          branch: 'Sucursal Sur',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 850,
          level: 3,
          completedStations: 7,
          status: 'activo',
          lastActivity: 'Hace 2 días',
          joinDate: '2024-02-15'
        },
        // Panamá - Agencia Panamá Norte
        {
          id: 'M007',
          email: 'carmen.silva@luismorenos.com',
          agency: 'Agencia Panamá Norte',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1200,
          level: 5,
          completedStations: 10,
          status: 'activo',
          lastActivity: 'Hace 1 hora',
          joinDate: '2024-01-30'
        },
        {
          id: 'M008',
          email: 'diego.morales@luismorenos.com',
          agency: 'Agencia Panamá Norte',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 900,
          level: 4,
          completedStations: 8,
          status: 'activo',
          lastActivity: 'Hace 3 horas',
          joinDate: '2024-02-05'
        },
        // Costa Rica
        {
          id: 'M009',
          email: 'patricia.mendez@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal San José',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1400,
          level: 6,
          completedStations: 11,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          joinDate: '2024-01-10'
        },
        {
          id: 'M010',
          email: 'roberto.castro@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal San José',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1150,
          level: 5,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 4 horas',
          joinDate: '2024-02-01'
        },
        {
          id: 'M011',
          email: 'lucia.herrera@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal Cartago',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1000,
          level: 4,
          completedStations: 8,
          status: 'activo',
          lastActivity: 'Hace 1 día',
          joinDate: '2024-01-20'
        },
        // Guatemala
        {
          id: 'M012',
          email: 'fernando.gomez@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Centro',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 1300,
          level: 5,
          completedStations: 10,
          status: 'activo',
          lastActivity: 'Hace 3 horas',
          joinDate: '2024-01-15'
        },
        {
          id: 'M013',
          email: 'isabel.ramirez@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Centro',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 1050,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 5 horas',
          joinDate: '2024-02-10'
        },
        {
          id: 'M014',
          email: 'miguel.vargas@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Quetzaltenango',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 800,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 2 días',
          joinDate: '2024-01-25'
        },
        // El Salvador
        {
          id: 'M015',
          email: 'elena.morales@luismorenos.com',
          agency: 'Agencia El Salvador',
          branch: 'Sucursal San Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          points: 1100,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 1 hora',
          joinDate: '2024-01-12'
        },
        {
          id: 'M016',
          email: 'antonio.reyes@luismorenos.com',
          agency: 'Agencia El Salvador',
          branch: 'Sucursal San Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          points: 750,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 3 días',
          joinDate: '2024-02-15'
        },
        // Honduras
        {
          id: 'M017',
          email: 'gloria.mendoza@luismorenos.com',
          agency: 'Agencia Honduras',
          branch: 'Sucursal Tegucigalpa',
          country: 'Honduras',
          region: 'Centroamérica',
          points: 900,
          level: 4,
          completedStations: 7,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          joinDate: '2024-01-18'
        },
        {
          id: 'M018',
          email: 'hugo.espinoza@luismorenos.com',
          agency: 'Agencia Honduras',
          branch: 'Sucursal San Pedro Sula',
          country: 'Honduras',
          region: 'Centroamérica',
          points: 650,
          level: 3,
          completedStations: 5,
          status: 'activo',
          lastActivity: 'Hace 1 semana',
          joinDate: '2024-02-01'
        },
        // Nicaragua
        {
          id: 'M019',
          email: 'valeria.ortiz@luismorenos.com',
          agency: 'Agencia Nicaragua',
          branch: 'Sucursal Managua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          points: 800,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 4 días',
          joinDate: '2024-01-22'
        },
        {
          id: 'M020',
          email: 'oscar.sandoval@luismorenos.com',
          agency: 'Agencia Nicaragua',
          branch: 'Sucursal León',
          country: 'Nicaragua',
          region: 'Centroamérica',
          points: 550,
          level: 2,
          completedStations: 4,
          status: 'activo',
          lastActivity: 'Hace 1 semana',
          joinDate: '2024-02-08'
        },
        // Usuarios adicionales para agencias que necesitan más contenido
        {
          id: 'M021',
          email: 'ricardo.mendoza@luismorenos.com',
          agency: 'Agencia Panamá Norte',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 1100,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 2 horas',
          joinDate: '2024-01-28'
        },
        {
          id: 'M022',
          email: 'laura.castro@luismorenos.com',
          agency: 'Agencia Panamá Norte',
          branch: 'Sucursal Norte',
          country: 'Panamá',
          region: 'Centroamérica',
          points: 950,
          level: 4,
          completedStations: 8,
          status: 'activo',
          lastActivity: 'Hace 5 horas',
          joinDate: '2024-02-12'
        },
        {
          id: 'M023',
          email: 'andres.herrera@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal San José',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1200,
          level: 5,
          completedStations: 10,
          status: 'activo',
          lastActivity: 'Hace 1 hora',
          joinDate: '2024-01-18'
        },
        {
          id: 'M024',
          email: 'monica.torres@luismorenos.com',
          agency: 'Agencia Costa Rica',
          branch: 'Sucursal San José',
          country: 'Costa Rica',
          region: 'Centroamérica',
          points: 1050,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 3 horas',
          joinDate: '2024-02-03'
        },
        {
          id: 'M025',
          email: 'carlos.morales@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Centro',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 1150,
          level: 4,
          completedStations: 9,
          status: 'activo',
          lastActivity: 'Hace 4 horas',
          joinDate: '2024-01-25'
        },
        {
          id: 'M026',
          email: 'patricia.vargas@luismorenos.com',
          agency: 'Agencia Guatemala',
          branch: 'Sucursal Centro',
          country: 'Guatemala',
          region: 'Centroamérica',
          points: 900,
          level: 3,
          completedStations: 7,
          status: 'activo',
          lastActivity: 'Hace 6 horas',
          joinDate: '2024-02-07'
        },
        {
          id: 'M027',
          email: 'jose.espinoza@luismorenos.com',
          agency: 'Agencia El Salvador',
          branch: 'Sucursal San Salvador',
          country: 'El Salvador',
          region: 'Centroamérica',
          points: 850,
          level: 3,
          completedStations: 7,
          status: 'activo',
          lastActivity: 'Hace 2 días',
          joinDate: '2024-01-30'
        },
        {
          id: 'M028',
          email: 'sandra.reyes@luismorenos.com',
          agency: 'Agencia Honduras',
          branch: 'Sucursal Tegucigalpa',
          country: 'Honduras',
          region: 'Centroamérica',
          points: 750,
          level: 3,
          completedStations: 6,
          status: 'activo',
          lastActivity: 'Hace 3 días',
          joinDate: '2024-02-01'
        },
        {
          id: 'M029',
          email: 'manuel.ortiz@luismorenos.com',
          agency: 'Agencia Honduras',
          branch: 'Sucursal San Pedro Sula',
          country: 'Honduras',
          region: 'Centroamérica',
          points: 600,
          level: 2,
          completedStations: 5,
          status: 'activo',
          lastActivity: 'Hace 1 semana',
          joinDate: '2024-02-10'
        },
        {
          id: 'M030',
          email: 'elena.sandoval@luismorenos.com',
          agency: 'Agencia Nicaragua',
          branch: 'Sucursal Managua',
          country: 'Nicaragua',
          region: 'Centroamérica',
          points: 700,
          level: 3,
          completedStations: 5,
          status: 'activo',
          lastActivity: 'Hace 5 días',
          joinDate: '2024-01-29'
        }
      ];

      setCountries(demoCountries);
      setAgencies(demoAgencies);
      setBranches(demoBranches);
      setUsers(demoUsers);

      // Guardar en cache
      localStorage.setItem('globalCountries', JSON.stringify(demoCountries));
      localStorage.setItem('globalAgencies', JSON.stringify(demoAgencies));
      localStorage.setItem('globalBranches', JSON.stringify(demoBranches));
      localStorage.setItem('globalUsers', JSON.stringify(demoUsers));

      setLoading(false);
    } catch (error) {
      console.error('Error cargando datos de ubicaciones:', error);
      setLoading(false);
    }
  };

  // Funciones de filtrado
  const getFilteredCountries = () => {
    return countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  };

  const getFilteredAgencies = () => {
    if (!selectedCountry) return [];
    return agencies.filter(agency => {
      const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = agency.country === selectedCountry.name;
      return matchesSearch && matchesCountry;
    });
  };

  const getFilteredUsers = () => {
    console.log('getFilteredUsers - selectedAgency:', selectedAgency);
    console.log('getFilteredUsers - selectedBranch:', selectedBranch);
    console.log('getFilteredUsers - users count:', users.length);
    
    if (!selectedAgency) return [];
    return users.filter(user => {
      const matchesSearch = user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAgency = user.agency === selectedAgency.name;
      const matchesBranch = !selectedBranch || user.branch === selectedBranch.name;
      
      console.log('User:', user.id, 'matchesAgency:', matchesAgency, 'matchesBranch:', matchesBranch);
      
      return matchesSearch && matchesAgency && matchesBranch;
    });
  };

  const filteredCountries = getFilteredCountries();
  const filteredAgencies = getFilteredAgencies();
  const filteredUsers = getFilteredUsers();

  // Handlers de navegación
  const handleCountryClick = (country: Country) => {
    console.log('Country clicked:', country);
    setSelectedCountry(country);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  const handleAgencyClick = (agency: Agency) => {
    console.log('Agency clicked:', agency);
    setSelectedAgency(agency);
    setSelectedBranch(null);
    setActiveTab('users');
    setSearchTerm('');
  };

  const handleBranchClick = (branch: Branch) => {
    console.log('Branch clicked:', branch);
    // Encontrar la agencia correspondiente a esta sucursal
    const correspondingAgency = agencies.find(agency => agency.name === branch.agency);
    if (correspondingAgency) {
      setSelectedAgency(correspondingAgency);
    }
    setSelectedBranch(branch);
    setActiveTab('users');
    setSearchTerm('');
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setSelectedAgency(null);
    setActiveTab('countries');
    setSearchTerm('');
  };

  const handleBackToAgencies = () => {
    setSelectedAgency(null);
    setSelectedBranch(null);
    setActiveTab('agencies');
    setSearchTerm('');
  };

  const renderLocationCard = (item: Country | Agency | Branch, type: 'country' | 'agency' | 'branch') => {
    const title = item.name;
    const subtitle = type === 'country' ? item.region : `${item.country} • ${item.region}`;
    const details = type === 'country' 
      ? `${item.agencies} agencias • ${item.branches} sucursales`
      : type === 'agency'
      ? `${item.branches} sucursales`
      : `${item.agency}`;

    return (
      <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{subtitle}</p>
            <p className="text-xs text-gray-500">{details}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#fdd742]">{item.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Puntos Totales</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{item.totalUsers}</div>
            <div className="text-xs text-gray-400">Total Usuarios</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{item.activeUsers}</div>
            <div className="text-xs text-gray-400">Activos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{((item.activeUsers / item.totalUsers) * 100).toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Actividad</div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Top Performer</div>
              <div className="text-xs text-gray-400">{item.topPerformer.id}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#fdd742]">{item.topPerformer.points} pts</div>
              <div className="text-xs text-gray-400">{item.topPerformer.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando ubicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white">
      <Header />
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
              style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
            >
              Países, Regiones y Sucursales
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona y supervisa todas las ubicaciones del sistema
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8 flex justify-center space-x-4">
            <button
              onClick={() => handleBackToCountries()}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'countries' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Países
            </button>
            <button
              onClick={() => selectedCountry && setActiveTab('agencies')}
              disabled={!selectedCountry}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'agencies' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              } ${!selectedCountry ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Agencias
            </button>
            <button
              onClick={() => selectedAgency && setActiveTab('users')}
              disabled={!selectedAgency}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'users' ? 'bg-[#fdd742] text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              } ${!selectedAgency ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Usuarios
            </button>
          </div>

          {/* Filtros */}
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="w-full">
              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder={
                    activeTab === 'countries' ? 'Nombre del país...' :
                    activeTab === 'agencies' ? 'Nombre de agencia...' :
                    'ID o email...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdd742] focus:border-[#fdd742] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contenido según el tab activo */}
          {activeTab === 'countries' && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#fdd742]">Países</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando países...</p>
                </div>
              ) : filteredCountries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay países</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.id}
                      onClick={() => handleCountryClick(country)}
                      className="bg-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 hover:border-[#fdd742]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white text-lg">{country.name}</h3>
                        <span className="text-sm text-gray-400">{country.region}</span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[#fdd742] mb-1">{country.totalPoints.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Puntos Totales</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{country.agencies}</div>
                          <div className="text-xs text-gray-400">Agencias</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{country.branches}</div>
                          <div className="text-xs text-gray-400">Sucursales</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{country.activeUsers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="px-4 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors text-sm font-medium group-hover:scale-105 transform">
                          Ver Agencias →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'agencies' && selectedCountry && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#fdd742] mb-2">
                    Agencias de {selectedCountry.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedCountry.region} • {filteredAgencies.length} agencias
                  </p>
                </div>
                <button
                  onClick={handleBackToCountries}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  ← Volver a Países
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando agencias...</p>
                </div>
              ) : filteredAgencies.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay agencias</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgencies.map((agency) => (
                    <div
                      key={agency.id}
                      onClick={() => handleAgencyClick(agency)}
                      className="bg-white/5 rounded-2xl border border-white/10 p-6 cursor-pointer hover:bg-white/10 hover:border-[#fdd742]/50 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white text-lg">{agency.name}</h3>
                        <span className="text-sm text-gray-400">{agency.country}</span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-[#fdd742] mb-1">{agency.totalPoints.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Puntos Totales</div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-xl font-bold text-white">{agency.totalUsers}</div>
                          <div className="text-xs text-gray-400">Usuarios</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-400">{agency.activeUsers}</div>
                          <div className="text-xs text-gray-400">Activos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">{agency.branches}</div>
                          <div className="text-xs text-gray-400">Sucursales</div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <button className="px-4 py-2 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors text-sm font-medium group-hover:scale-105 transform">
                          Ver Usuarios →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && selectedAgency && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#fdd742] mb-2">
                    {selectedBranch ? `Usuarios de ${selectedBranch.name}` : `Usuarios de ${selectedAgency.name}`}
                  </h2>
                  <p className="text-gray-400">
                    {selectedAgency.region} • {selectedAgency.country} • {filteredUsers.length} usuarios
                    {selectedBranch && ` • ${selectedBranch.name}`}
                  </p>
                </div>
                <button
                  onClick={handleBackToAgencies}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  ← Volver a Agencias
                </button>
              </div>

              {/* Sucursales de la Agencia */}
              {!selectedBranch && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Sucursales de {selectedAgency.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {branches
                      .filter(branch => branch.agency === selectedAgency.name)
                      .map((branch) => (
                        <div
                          key={branch.id}
                          onClick={() => handleBranchClick(branch)}
                          className="bg-white/5 rounded-xl border border-white/10 p-4 cursor-pointer hover:bg-white/10 hover:border-[#fdd742]/50 transition-all group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-white">{branch.name}</h4>
                            <span className="text-sm text-gray-400">{branch.country}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#fdd742]">{branch.totalUsers}</div>
                              <div className="text-xs text-gray-400">Usuarios</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-400">{branch.activeUsers}</div>
                              <div className="text-xs text-gray-400">Activos</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-400">{branch.totalPoints.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Puntos</div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <button className="px-3 py-1 bg-[#fdd742] text-black rounded-lg hover:bg-[#fdd742]/80 transition-colors text-xs font-medium group-hover:scale-105 transform">
                              Ver Usuarios →
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Botón para ver todos los usuarios de la agencia */}
              {selectedBranch && (
                <div className="mb-6">
                  <button
                    onClick={() => setSelectedBranch(null)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    ← Ver todas las sucursales
                  </button>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdd742] mx-auto mb-4"></div>
                  <p className="text-gray-400">Cargando usuarios...</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No hay usuarios</h3>
                  <p className="text-gray-400">Ajusta los filtros para ver más resultados.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white/5 rounded-2xl border border-white/10 p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{user.id}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.branch}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-[#fdd742]">{user.points}</div>
                          <div className="text-xs text-gray-400">Puntos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">Nivel {user.level}</div>
                          <div className="text-xs text-gray-400">{user.completedStations} estaciones</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'activo' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
