export const BOOK_TYPE = 'Book'
export const E_BOOK_TYPE = 'E-book'
export const AUDIO_BOOK_TYPE = 'Audio book'
export const BOOK_TYPES = [BOOK_TYPE, E_BOOK_TYPE, AUDIO_BOOK_TYPE]

export const ORDER_TYPE_PICKUP = 'pickup'
export const ORDER_TYPE_DELIVERY = 'delivery'
export const ORDER_TYPE_MEDIA_ONLY = 'media only'
export const ORDER_TYPES = [ORDER_TYPE_PICKUP, ORDER_TYPE_DELIVERY, ORDER_TYPE_MEDIA_ONLY]
export type OrderType = typeof ORDER_TYPE_PICKUP | typeof ORDER_TYPE_DELIVERY | typeof ORDER_TYPE_MEDIA_ONLY