import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const login = () => {
  return (
    <div className='bg-gradient-to-br from-slate-700 to-slate-800 min-h-screen flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <Card className='shadow-2xl border-0 bg-white/10 backdrop-blur-sm'>
          <CardHeader className='text-center pb-6'>
            <h1 className='text-3xl font-bold text-white mb-2'>Connexion</h1>
            <p className='text-slate-300 text-sm'>Entrez vos identifiants pour accéder à votre compte</p>
          </CardHeader>
          
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-slate-200'>Email</Label>
              <Input 
                id='email'
                type='email' 
                placeholder='exemple@email.com'
                className='bg-white/20 border-slate-400 text-white placeholder-slate-400 focus:border-white focus:ring-white'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password' className='text-slate-200'>Mot de passe</Label>
              <Input 
                id='password'
                type='password' 
                placeholder='••••••••'
                className='bg-white/20 border-slate-400 text-white placeholder-slate-400 focus:border-white focus:ring-white'
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <input 
                  type='checkbox' 
                  id='remember'
                  className='rounded border-slate-400 bg-white/20 text-slate-700 focus:ring-white'
                />
                <Label htmlFor='remember' className='text-sm text-slate-300'>Se souvenir</Label>
              </div>
              <Button variant='link' className='text-slate-300 hover:text-white p-0 h-auto text-sm'>
                Mot de passe oublié?
              </Button>
            </div>

            <Button className='w-full bg-white text-slate-700 hover:bg-slate-100 font-semibold py-3 transition-all duration-200'>
              Se connecter
            </Button>
          </CardContent>
          
          <CardFooter className='pt-6'>
            <div className='text-center w-full'>
              <p className='text-slate-400 text-sm'>
                Pas encore de compte?{' '}
                <Button variant='link' className='text-white hover:text-slate-200 p-0 h-auto text-sm font-semibold'>
                  S'inscrire
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default login