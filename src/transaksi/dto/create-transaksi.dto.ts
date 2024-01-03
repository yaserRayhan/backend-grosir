export class CreateTransaksiDto {
  total_harga: number;
  total_item: number;
  total_diskon: number;
  total_bayar: number;
  status: string;
  bukti_pembayaran: string;
  no_rekening_pembayar: string;
  nama_pembayar: string;
  user: { id: number };
}
