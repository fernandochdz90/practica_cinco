<script>

import { useToast } from 'primevue/usetoast';
import { ref, onBeforeMount, onMounted, computed } from 'vue';

export default {
	data() {

		const toast = useToast();
		const visibleUpdate = ref(false);
		const visibleDelete = ref(false);

		const indice = ref('');
		const nomp = ref('');
		const cantidad = ref('');
		const precioUnitario = ref('');

		// Editar un producto
		function editarProducto(row, rowIndex) {
			console.log("Row Index recibido:", parseInt(row.cns - 1));
			indice.value = row.cns - 1;
			nomp.value = row.nomProducto;
			cantidad.value = row.cantidad;
			precioUnitario.value = row.precioUnitario;
			//this.productoItem.value = row.value;

			console.log("boton actualizar");
			visibleUpdate.value = true;
		}

		async function updateProducto() {
			const index = parseInt(indice.value);
			console.log("Índice:", index);
			console.log(index);
			if (index !== -1 && index < this.tablaCompras.length) {
				// Actualizar el producto en la tabla
				this.tablaCompras[index] = {
					cns: index + 1,
					nomProducto: nomp.value,
					cantidad: parseFloat(cantidad.value),
					precioUnitario: parseFloat(precioUnitario.value),
					precioParcial: parseFloat(cantidad.value) * parseFloat(precioUnitario.value)
				};
				this.toast.add({ severity: 'success', summary: 'Actualizado', detail: 'Producto actualizado correctamente', life: 3000 });
			} else {
				console.log("error");
			}
			// Limpiar campos y cerrar el diálogo
			this.visibleUpdate = false;
		}


		function eliminarProducto(row) {
			indice.value = row.cns - 1;
			console.log("eliminar: ", row.cns - 1);
			visibleDelete.value = true;
		}

		// Eliminar un producto
		async function deleteProducto() {
			const index = parseInt(indice.value);
			console.log("delete: ", index);
			if (index !== -1 && index < this.tablaCompras.length) {
				this.tablaCompras.splice(index, 1);
				this.tablaCompras.forEach((item, idx) => {
					item.cns = idx + 1;
				});
				toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Producto eliminado', life: 3000 });
			} else {
				console.log("error a eliminar");
			}
			visibleDelete.value = false;
		}


		async function registrarCompra() {
			// Validar que los campos no estén vacíos y que los valores sean numéricos
			console.log('Nomp: ', this.productoItem.nomProducto); console.log('Cantidad: ', this.productoItem.cantidad); console.log('Precio Unitario:', this.productoItem.precioUnitario);
			if (
				!this.productoItem.nomProducto ||
				this.productoItem.nomProducto.trim() === "" ||
				!this.productoItem.cantidad ||
				this.productoItem.cantidad.trim() === "" ||
				!this.productoItem.precioUnitario ||
				this.productoItem.precioUnitario.trim() === "" ||
				isNaN(this.productoItem.cantidad) || isNaN(this.productoItem.precioUnitario)
			) {	
				toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'Todos los campos son obligatorios y deben ser números válidos', life: 3000 });
				return;
			}

			// Agregar el producto a la tabla
			this.tablaCompras.push({
				cns: this.tablaCompras.length + 1,
				nomProducto: this.productoItem.nomProducto,
				cantidad: parseFloat(this.productoItem.cantidad),
				precioUnitario: parseFloat(this.productoItem.precioUnitario),
				precioParcial: parseFloat(this.productoItem.cantidad) * parseFloat(this.productoItem.precioUnitario)
			});
			this.productoItem.nomProducto = '';
			this.productoItem.precioUnitario = '';
			this.productoItem.cantidad = '';

			// Limpiar los campos después de registrar
			nomp.value = '';
			cantidad.value = '';
			precioUnitario.value = '';
			toast.add({ severity: 'success', summary: 'Confirmación', detail: 'Nueva compra registrada', life: 3000 });

		}

		return {
			registrarCompra,
			toast,
			nomp,
			cantidad,
			precioUnitario,
			visibleDelete,
			visibleUpdate,
			editarProducto,
			deleteProducto,
			updateProducto,
			eliminarProducto,
			tablaCompras: [
				{ "cns": 1, "nomProducto": "Impresora LaserJet Color", "cantidad": 2, "precioUnitario": 5200.00, "precioParcial": 10400.00 },
				{ "cns": 2, "nomProducto": "Monitor LED 31 plg.", "cantidad": 3, "precioUnitario": 1700.00, "precioParcial": 5100.00 }
			],
			productoItem: {
				cns: null,
				nomProducto: null,
				cantidad: null,
				precioUnitario: null,
				precioParcial: null
			}
		}
	},
	created() {

	},
	methods: {
		formatoMoneda(value) {
			if (value)
				return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			return '$0.00';
		}
	},
	computed: {
		subtotal() {
			return this.tablaCompras.reduce((acc, item) => acc + item.precioParcial, 0);
		},
		iva() {
			return this.subtotal * 0.16; // Asumiendo un IVA del 16%
		},
		totalTotal() {
			return this.subtotal + this.iva;
		}
	}
}
</script>


<template>
	<div class="p-grid">
		<Toast />
		<div class="p-col-12">
			<div class="card">
				<Panel header="PUNTO DE VENTA (POS)" style="height: 100%">
					<Toolbar class="p-mb-4">
						<template v-slot:start>
							<InputText type="text" size="40" placeholder="Nombre del producto..."
								v-model="productoItem.nomProducto" />
							<InputText class="ml-8" type="text" placeholder="Cant" v-model="productoItem.cantidad" />
							<InputText class="ml-8" type="text" placeholder="$ Precio U."
								v-model="productoItem.precioUnitario" />
						</template>
						<template v-slot:end>
							<Button label="Registrar" icon="pi pi-plus" class="p-button-success p-mr-2"
								@click="registrarCompra()" />
						</template>
					</Toolbar>
					<br>

					<DataTable :value="tablaCompras" v-model:selection="productoItem" class="p-datatable-gridlines"
						dataKey="cns" :rows="5"
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						:rowsPerPageOptions="[5, 10, 25]"
						currentPageReportTemplate="Visualizando {last} de {totalRecords} productos"
						style="margin-bottom: 20px" :paginator="true" responsiveLayout="scroll">

						<Column field="cns" header="Cns" :sortable="true" style="width:50px"></Column>
						<Column field="nomProducto" header="Nombre del Producto" style="width:370px"></Column>
						<Column field="precioUnitario" header="Precio U." dataType="numeric" style="width:80px">
							<template #body="slotProps">
								{{ formatoMoneda(slotProps.data.precioUnitario) }}
							</template>
						</Column>
						<Column field="cantidad" header="Cant." style="width:60px;text-align:center"></Column>
						<Column field="precioParcial" header="Precio P." style="width:80px">
							<template #body="slotProps">
								{{ formatoMoneda(slotProps.data.precioParcial) }}
							</template>
						</Column>
						<Column style="width:140px">
							<template #header>
								Acciones
							</template>
							<template #body="slotProps">
								<Button icon="pi pi-pencil" type="button" class="p-button-success p-mr-2 p-mb-1"
									@click="editarProducto(slotProps.data, slotProps.rowIndex)"></Button>
								<Dialog v-model:visible="visibleUpdate" modal header="Actualizar datos de un producto"
									:style="{ width: '45vw' }">
									<p>
									<div class="flex gap-2">
										<div class="flex-auto">
											<label for="nomp"><strong>Nombre del producto: </strong></label>
											<InputText class="ml-2" id="nomp" v-model="nomp" />
										</div>
										<div class="flex-auto">
											<label for="precioUnitario"><strong>Precio Unitario: </strong></label>
											<InputText class="ml-2" id="precioUnitario" v-model="precioUnitario" />
										</div>
										<div class="flex-auto">
											<label for="cantidad"><strong>Cantidad: </strong></label>
											<InputText class="ml-2" id="cantidad" v-model="cantidad" />
										</div>
									</div>
									<br>
									</p>
									<template #footer>
										<Button label="Actualizar" icon="pi pi-replay"
											@click="updateProducto()"></Button>
									</template>
								</Dialog>
								<Button icon="pi pi-trash" type="button" class="p-button-danger p-mb-1"
									@click="eliminarProducto(slotProps.data)"></Button>
								<Dialog v-model:visible="visibleDelete" modal
									header="Estas seguro que quieres borrar este producto?" :style="{ width: '30vw' }">
									<p>
										<br>
									</p>
									<template #footer>
										<Button label="Eliminar" severity="warning" icon="pi pi-check"
											@click="deleteProducto()" autofocus />
									</template>
								</Dialog>
							</template>
						</Column>
					</DataTable>

					<br>
					<Toolbar class="p-mb-4">
						<template v-slot:start>
							<h4>Resumen de Compra</h4>

						</template>
						<template v-slot:end>
							<div class="p-d-flex p-ai-center">
								<div class="p-mr-4">
									<strong>Subtotal:</strong> {{ formatoMoneda(subtotal) }}
								</div>
								<div class="p-mr-4">
									<strong>IVA (16%):</strong> {{ formatoMoneda(iva) }}
								</div>
								<div>
									<strong>Total:</strong> {{ formatoMoneda(totalTotal) }}
								</div>
							</div>
						</template>
					</Toolbar>
				</Panel>
			</div>
		</div>
	</div>
</template>