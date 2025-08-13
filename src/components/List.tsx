
import { Calendar, User as Gender, Mail, MapPin, Pencil, Trash2 } from "lucide-react"
import type { User } from "../App"
import { formatBirthDate } from "../utils"
import { Badge } from "./Badge"
import { Button } from "./Button"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"

interface ListProps {
  users: User[]
  onEditar: (user: User) => void
  onExcluir: (id: string) => void
}

export function List({ users, onEditar, onExcluir }: ListProps) {
  if (users.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-slate-400 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">Nenhuma pessoa cadastrada</h3>
            <p className="text-sm text-slate-500">Comece adicionando uma nova pessoa ao sistema</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Pessoas Cadastradas ({users.length})</h2>
      </div>

      <div className="flex flex-wrap justify-start gap-2">
        {users.map((user) => (
          <Card key={user._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-800 mb-1">{user.name}</CardTitle>
                  <Badge className="text-xs">
                    CPF: {user.CPF}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => onEditar(user)}
                    className="h-8 w-8 p-0 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm(`Tem certeza que deseja excluir ${user.name}?`)) {
                        onExcluir(String(user._id))
                      }
                    }}
                    className="h-8 w-8 p-0 text-slate-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{user.birthPlace}</span> / <span>{user.nationality}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>Nascimento em {formatBirthDate(user.birthDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Gender className="h-4 w-4" />
                  <span>{user.gender}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}