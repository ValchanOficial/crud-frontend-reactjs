import { useEffect, useState } from "react"
import type { User } from "../App"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { Input } from "./Input"
import { Label } from "./Label"

interface FormProps {
  user?: User
  onSubmit: (dados: Partial<User>) => void
  onCancel: () => void
  titulo: string
}

export function Form({ user, onSubmit, onCancel, titulo }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    CPF: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        gender: user.gender || "",
        email: user.email || "",
        birthDate: user.birthDate ? user.birthDate : "",
        birthPlace: user.birthPlace || "",
        nationality: user.nationality || "",
        CPF: user.CPF,
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.birthDate || !formData.CPF) {
      alert("Por favor, preencha os campos obrigatórios.")
      return
    }

    onSubmit({
      name: formData.name,
      gender: formData.gender,
      email: formData.email,
      birthDate: formData.birthDate,
      birthPlace: formData.birthPlace,
      nationality: formData.nationality,
      CPF: formData.CPF,
    })

    if (!user) {
      setFormData({
        name: "",
        gender: "",
        email: "",
        birthDate: "",
        birthPlace: "",
        nationality: "",
        CPF: "",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800">{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nome*
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Digite o nome completo"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="CPF" className="text-sm font-medium text-slate-700">
              CPF*
            </Label>
            <Input
              id="CPF"
              type="text"
              value={formData.CPF}
              onChange={(e) => handleChange("CPF", e.target.value)}
              placeholder="Digite o CPF"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700">
              Data de nascimento*
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="Digite a data de nascimento"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
              Gênero
            </Label>
            <Input
              id="gender"
              type="text"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              placeholder="Digite o genero"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full"
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="birthPlace" className="text-sm font-medium text-slate-700">
              Naturalidade
            </Label>
            <Input
              id="birthPlace"
              type="text"
              value={formData.birthPlace}
              onChange={(e) => handleChange("birthPlace", e.target.value)}
              placeholder="Naturalidade"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationality" className="text-sm font-medium text-slate-700">
              Nacionalidade
            </Label>
            <Input
              id="nationality"
              type="text"
              value={formData.nationality}
              onChange={(e) => handleChange("nationality", e.target.value)}
              placeholder="Nacionalidade"
              className="w-full"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
              {user ? "Atualizar" : "Cadastrar"}
            </Button>
            <Button
              onClick={onCancel}
              className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}