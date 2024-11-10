<script setup>
import { ref } from 'vue';

const nombres = ref('');
const apellidoPaterno = ref('');
const apellidoMaterno = ref('');
const fechaNacimiento = ref('');
const rfc = ref('');

// Función para generar el RFC
function generarRFC() {
    if (!nombres.value || !apellidoPaterno.value || !apellidoMaterno.value || !fechaNacimiento.value) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const apPaterno = apellidoPaterno.value.slice(0, 2).toUpperCase();
    const apMaterno = apellidoMaterno.value.slice(0, 1).toUpperCase();
    const nombre = nombres.value.slice(0, 1).toUpperCase();
    const fecha = new Date(fechaNacimiento.value);

    // Validar la fecha
    if (isNaN(fecha.getTime())) {
        alert('Fecha de nacimiento no válida.');
        return;
    }

    const año = String(fecha.getFullYear()).slice(-2);
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const día = String(fecha.getDate() + 1).padStart(2, '0');

    rfc.value = `${apPaterno}${apMaterno}${nombre}${año}${mes}${día}`;
}
</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <div class="font-semibold text-xl">Datos Personales</div>
                    <div class="flex flex-col gap-2">
                        <label for="nombres">Nombre(s):</label>
                        <InputText id="nombres" v-model="nombres" type="text" placeholder="Nombre(s)" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="apellidoPaterno">Apellido Paterno:</label>
                        <InputText id="apellidoPaterno" v-model="apellidoPaterno" type="text" placeholder="Apellido Paterno" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="apellidoMaterno">Apellido Materno:</label>
                        <InputText id="apellidoMaterno" v-model="apellidoMaterno" type="text" placeholder="Apellido Materno" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                        <InputText id="fechaNacimiento" v-model="fechaNacimiento" type="date" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="rfc">RFC:</label>
                        <InputText id="rfc" v-model="rfc" type="text" placeholder="RFC" readonly />
                    </div>
                    <Button label="Generar RFC" @click="generarRFC" class="mt-4" />
                </div>
            </div>
        </div>
    </Fluid>
</template>

<style scoped>
.card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>
