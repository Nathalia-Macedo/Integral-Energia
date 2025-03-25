// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUpload, FiDownload } from 'react-icons/fi';
// import Header from '../Components/Header';
// import { useApp } from '../Context/AppContext';

// export default function Dashboard() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [targetForm, setTargetForm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const { processFile } = useApp();

//   const onDrop = useCallback(acceptedFiles => {
//     setSelectedFile(acceptedFiles[0]);
//     setMessage('');
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleFormChange = (event) => {
//     setTargetForm(event.target.value);
//     setMessage('');
//   };

//   const handleSubmit = async (format) => {
//     if (!selectedFile || !targetForm) {
//       setMessage('Por favor, selecione um arquivo e um formulário de destino.');
//       return;
//     }

//     setIsLoading(true);
//     setMessage('');

//     try {
//       await processFile(selectedFile, targetForm, format);
//       setMessage(`Arquivo ${format.toUpperCase()} gerado com sucesso!`);
//     } catch (error) {
//       console.error('Erro ao processar o arquivo:', error);
//       setMessage(`Erro ao processar o arquivo: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <div className="px-4 py-6 sm:px-0">
//             <div className="bg-white shadow rounded-lg p-6">
//               <div {...getRootProps()} className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragActive ? 'border-green-500' : ''}`}>
//                 <div className="space-y-1 text-center">
//                   <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
//                       <span>Carregar um arquivo</span>
//                       <input {...getInputProps()} id="file-upload" name="file-upload" type="file" className="sr-only" />
//                     </label>
//                     <p className="pl-1">ou arraste e solte</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PDF, DOC, DOCX, XLS, XLSX até 10MB
//                   </p>
//                 </div>
//               </div>
//               {selectedFile && (
//                 <p className="mt-2 text-sm text-gray-600">
//                   Arquivo selecionado: {selectedFile.name}
//                 </p>
//               )}

//               <div className="mt-6">
//                 <label htmlFor="target-form" className="block text-sm font-medium text-gray-700 mb-2">
//                   Escolha o formulário de destino
//                 </label>
//                 <select
//                   id="target-form"
//                   name="target-form"
//                   required
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
//                   value={targetForm}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Selecione o formulário de destino</option>
//                   <option value="aneel">Formulário Aneel</option>
//                   <option value="memorial_descritivo">Memorial Descritivo</option>
//                   <option value="termo_de_aceite">Termo de Aceite</option>
//                   <option value="lista_de_rateio">Lista de rateio</option>
//                   <option value="formulario_de_solicitacao_de_acesso">Solicitação de acesso</option>
//                   <option value="memorial_descritivo_brasilia">Memorial Descritivo Brasilia</option>
//                 </select>
//               </div>

//               <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
//                 <button
//                   onClick={() => handleSubmit('pdf')}
//                   disabled={isLoading}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-3 sm:mb-0"
//                 >
//                   <FiDownload className="mr-2" /> Baixar PDF
//                 </button>
//                 <button
//                   onClick={() => handleSubmit('docx')}
//                   disabled={isLoading}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3 sm:mb-0"
//                 >
//                   <FiDownload className="mr-2" /> Baixar Word
//                 </button>
//                 <button
//                   onClick={() => handleSubmit('xlsx')}
//                   disabled={isLoading}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//                 >
//                   <FiDownload className="mr-2" /> Baixar Excel
//                 </button>
//               </div>

//               {isLoading && (
//                 <div className="mt-4 text-center text-sm text-gray-600">
//                   Processando... Por favor, aguarde.
//                 </div>
//               )}

//               {message && (
//                 <div className={`mt-4 text-center text-sm ${message.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
//                   {message}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FiUpload, FiDownload } from "react-icons/fi"
import Header from "../Components/Header"
import { useApp } from "../Context/AppContext"

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [targetForm, setTargetForm] = useState("")
  const [concessionaria, setConcessionaria] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { processFile } = useApp()

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0])
    setMessage("")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleConcessionariaChange = (event) => {
    setConcessionaria(event.target.value)
    setTargetForm("") // Reset the form selection when concessionária changes
    setMessage("")
  }

  const handleFormChange = (event) => {
    setTargetForm(event.target.value)
    setMessage("")
  }

  const handleSubmit = async () => {
    if (!selectedFile || !targetForm || !concessionaria) {
      setMessage("Por favor, selecione um arquivo, uma concessionária e um formulário de destino.")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      // Now passing the concessionaria as the format parameter
      const concessionariaFormat = concessionaria === "edp" ? "edp" : "neoenergia"
      await processFile(selectedFile, targetForm, concessionariaFormat)
      setMessage("Arquivo gerado com sucesso!")
    } catch (error) {
      console.error("Erro ao processar o arquivo:", error)
      setMessage(`Erro ao processar o arquivo: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Define document options based on selected concessionária
  const getDocumentOptions = () => {
    if (concessionaria === "edp") {
      return [
        { value: "memorial_descritivo", label: "Memorial Descritivo" },
        { value: "termo_de_aceite", label: "Termo de Aceite" },
        { value: "lista_de_rateio", label: "Lista de Rateio" },
        { value: "formulario_de_solicitacao_de_acesso", label: "Formulário de Solicitação de Acesso" },
      ]
    } else if (concessionaria === "neoenergia") {
      return [
        { value: "formulario_de_solicitacao", label: "Formulário de Solicitação" },
        { value: "memorial_descritivo", label: "Memorial Descritivo" },
        { value: "dados_central_geradora", label: "Dados da Central Geradora" },
      ]
    }
    return []
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <div
                {...getRootProps()}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragActive ? "border-green-500" : ""}`}
              >
                <div className="space-y-1 text-center">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                    >
                      <span>Carregar um arquivo</span>
                      <input {...getInputProps()} id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, XLS, XLSX até 10MB</p>
                </div>
              </div>
              {selectedFile && <p className="mt-2 text-sm text-gray-600">Arquivo selecionado: {selectedFile.name}</p>}

              <div className="mt-6">
                <label htmlFor="concessionaria" className="block text-sm font-medium text-gray-700 mb-2">
                  Escolha a concessionária
                </label>
                <select
                  id="concessionaria"
                  name="concessionaria"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={concessionaria}
                  onChange={handleConcessionariaChange}
                >
                  <option value="">Selecione a concessionária</option>
                  <option value="edp">EDP</option>
                  <option value="neoenergia_brasilia">NEOENERGIA BRASILIA</option>
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="target-form" className="block text-sm font-medium text-gray-700 mb-2">
                  Escolha o formulário de destino
                </label>
                <select
                  id="target-form"
                  name="target-form"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={targetForm}
                  onChange={handleFormChange}
                  disabled={!concessionaria}
                >
                  <option value="">Selecione o formulário de destino</option>
                  {getDocumentOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FiDownload className="mr-2" /> Baixar Documento
                </button>
              </div>

              {isLoading && (
                <div className="mt-4 text-center text-sm text-gray-600">Processando... Por favor, aguarde.</div>
              )}

              {message && (
                <div
                  className={`mt-4 text-center text-sm ${message.includes("sucesso") ? "text-green-600" : "text-red-600"}`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

