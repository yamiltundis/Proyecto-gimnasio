import fotoYamil from './assets/FotoFormal.jpg'
import fotoPri from './assets/FotoPri.jpeg'
import fotoColo from './assets/FotoColo.jpeg'
import fotoJulian from './assets/FotoJulian.jpeg'

export const clientes = [
        {
            id: 1,
            nombre:'Yamil',
            apellido: 'Tundis',
            dni: 45910179,
            email: 'yamiltundis6@gmail.com',
            foto: fotoYamil,
            estado: 'activo'
        },
        {
            id: 2,
            nombre:'Priscila',
            apellido: 'Paroni',
            dni: 47108341,
            email: 'prichuparoni6@gmail.com',
            foto: fotoPri,
            estado: 'activo'
        },
        {
            id: 3,
            nombre:'Julian',
            apellido: 'Figueira',
            dni: 46102393,
            email: 'julian@gmail.com',
            foto: fotoJulian,
            estado: 'suspendido'
        },
        {
            id: 4,
            nombre:'Colo',
            apellido: 'Tundis',
            dni: 55000000,
            email: 'colito@gmail.com',
            foto: fotoColo,
            estado: 'suspendido'
        },
    ]