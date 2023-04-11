import { readFile, writeFile } from 'node:fs/promises'


async function getAlumnos() {
    return readFile('./data/alumnos.json')
        .then(function (data) {
            return JSON.parse(data)
        })
        .catch(function () {
            return []
        })
}

async function getAlumnoById(legajo) {
    return getAlumnos()
        .then(function (alumnos) {
            let alumno = null
            for (let i = 0; i < alumnos.length; i++) {
                if (alumnos[i].legajo == legajo) {
                    alumno = alumnos[i]
                    break
                }
            }

            return alumno
        })
}

async function addAlumno(newAlumno) {
    const alumnos = await getAlumnos()

        const nuevoAlum = {
            ...newAlumno,
        }
        alumnos.push(nuevoAlum)
        
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
        
        return alumnos
}

async function editAlumno(alumno) {
    let alumnos = await getAlumnos()

    console.log(alumno.legajo)
    
    for (let i = 0; i < alumnos.length; i++) {
        console.log(alumnos[i].legajo)
        if (alumno.legajo == alumnos[i].legajo) {
            console.log('Alumno modificado correctamente')
            alumnos[i] = alumno
            await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
            break
        }
    }
    
    return alumno
}

async function deleteAlumno(legajo) {
    let alumnos = await getAlumnos()
    let alumno = null

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].legajo == legajo) {
            alumno = alumnos[i]
            alumnos.splice(i, 1)
            await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
            break
        }
    }
    return alumno
}

export {
    getAlumnos,
    getAlumnoById,
    addAlumno,
    editAlumno,
    deleteAlumno
}