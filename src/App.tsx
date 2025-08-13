import { useMutation, useQuery } from "@tanstack/react-query"
import { Plus, Users } from "lucide-react"
import { useState } from "react"
import { addUser, deleteUser, fetchUsers, updateUser } from "./api/users"
import { Button } from "./components/Button"
import { Form } from "./components/Form"
import { List } from "./components/List"
import { queryClient } from "./main"

export type User = {
  id: string | null;
  name: string; // required
  gender: string | null;
  email: string | null;
  birthDate: string; // required
  birthPlace: string | null;
  nationality: string | null;
  CPF: string; // required
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

function App() {
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState<User | undefined>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  console.log('Data fetched:', data);
  console.log('isLoading:', isLoading);
  console.log('error:', error);

  const addPerson = useMutation({
    mutationFn: addUser,
    onError: (error) => {
      console.error('Erro ao adicionar usuário:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // Refresh the users query
    },
  });

const updatePerson = useMutation({
      mutationFn: updateUser,
      onError: (error) => {
        console.error('Erro ao atualizar usuário:', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] }); // Refresh the users query
      },
    });

const deletePerson = useMutation({
      mutationFn: deleteUser,
      onError: (error) => {
        console.error('Erro ao excluir usuário:', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] }); // Refresh the users query
      },
    });


  const handleSubmitForm = (dados: Partial<User>) => {
    if (isEditing) {
      updatePerson.mutate({ ...isEditing, ...dados })
      setIsEditing(undefined)
    } else {
      addPerson.mutate(dados)
    }
    setShowForm(false)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setIsEditing(undefined)
  }

  const handleEditar = (pessoa: User) => {
    setIsEditing(pessoa)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    deletePerson.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Cadastro de Pessoas</h1>
              <p className="text-slate-600">Gerencie o cadastro de pessoas de forma simples e eficiente</p>
            </div>
          </div>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Pessoa
            </Button>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {showForm && (
            <div className="lg:col-span-1">
              <Form
                user={isEditing}
                onSubmit={handleSubmitForm}
                onCancel={handleCancelForm}
                titulo={isEditing ? "Editar Pessoa" : "Nova Pessoa"}
              />
            </div>
          )}

          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <List users={data || []} onEditar={handleEditar} onExcluir={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
