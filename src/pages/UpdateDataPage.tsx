import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';

interface UploadRecord {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'success' | 'error' | 'processing';
  recordsProcessed?: number;
  errorMessage?: string;
}

export default function UpdateDataPage() {
  const { user } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Datos de ejemplo para el historial
  const [uploadHistory] = useState<UploadRecord[]>([
    {
      id: '1',
      fileName: 'datos_empleados_enero_2024.xlsx',
      uploadDate: '2024-01-15T10:30:00Z',
      status: 'success',
      recordsProcessed: 150
    },
    {
      id: '2',
      fileName: 'actualizacion_progreso_diciembre.xlsx',
      uploadDate: '2024-01-10T14:20:00Z',
      status: 'success',
      recordsProcessed: 89
    },
    {
      id: '3',
      fileName: 'nuevos_empleados_diciembre.xlsx',
      uploadDate: '2024-01-05T09:15:00Z',
      status: 'error',
      errorMessage: 'Formato de archivo incorrecto'
    },
    {
      id: '4',
      fileName: 'progreso_noviembre_2023.xlsx',
      uploadDate: '2023-12-28T16:45:00Z',
      status: 'success',
      recordsProcessed: 203
    },
    {
      id: '5',
      fileName: 'datos_octubre_2023.xlsx',
      uploadDate: '2023-12-20T11:30:00Z',
      status: 'success',
      recordsProcessed: 178
    },
    {
      id: '6',
      fileName: 'actualizacion_septiembre.xlsx',
      uploadDate: '2023-12-15T13:20:00Z',
      status: 'success',
      recordsProcessed: 95
    }
  ]);

  const totalPages = Math.ceil(uploadHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = uploadHistory.slice(startIndex, endIndex);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      // Simular procesamiento del archivo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validar que sea un archivo Excel
      const validExtensions = ['.xlsx', '.xls'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        throw new Error('Por favor selecciona un archivo Excel (.xlsx o .xls)');
      }

      // Simular éxito
      setUploadStatus('success');
      
      // Aquí iría la lógica real para procesar el Excel
      console.log('Archivo procesado:', file.name);
      
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al procesar el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 bg-green-400/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Exitoso';
      case 'error':
        return 'Error';
      case 'processing':
        return 'Procesando';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen w-full text-white">
      <Header />

      {/* Main Content */}
      <main className="p-6">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#fdd742] drop-shadow-[0_0_8px_rgba(253,215,66,0.3)]" 
                style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
              Actualizar Data
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto">
              Gestiona y actualiza los datos de tus empleados mediante archivos Excel. 
              Mantén actualizado el progreso y las actividades de tu equipo.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>Subir Archivo Excel</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  isUploading 
                    ? 'border-[#fdd742] bg-[#fdd742]/10' 
                    : 'border-gray-600 hover:border-[#fdd742] hover:bg-[#fdd742]/5'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-[#fdd742] border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-lg text-[#fdd742]">Procesando archivo...</p>
                    <p className="text-sm text-gray-400">Por favor espera mientras procesamos tu archivo Excel</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-[#fdd742]/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-[#fdd742]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xl font-semibold mb-2">Arrastra tu archivo Excel aquí</p>
                      <p className="text-gray-400 mb-4">o haz clic para seleccionar un archivo</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#fdd742] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#fdd742]/90 transition-colors"
                      >
                        Seleccionar Archivo
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Formatos soportados: .xlsx, .xls (Máximo 10MB)
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Status Messages */}
              {uploadStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-400 font-semibold">Archivo procesado exitosamente</span>
                  </div>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-400 font-semibold">{errorMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#fdd742]" style={{ fontFamily: "'Orbitron', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>Historial de Subidas</h2>
            
            <div className="space-y-4">
              {currentItems.map((record) => (
                <div key={record.id} className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#fdd742]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{record.fileName}</h3>
                          <p className="text-sm text-gray-400">{formatDate(record.uploadDate)}</p>
                          {record.recordsProcessed && (
                            <p className="text-xs text-gray-500">{record.recordsProcessed} registros procesados</p>
                          )}
                          {record.errorMessage && (
                            <p className="text-xs text-red-400">{record.errorMessage}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-400">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, uploadHistory.length)} de {uploadHistory.length} registros
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    Anterior
                  </button>
                  <span className="px-3 py-2 text-sm text-gray-400">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
