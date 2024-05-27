'use client'

import Loading from "@/app/loading";
import useOrders from "@/hook/useOrders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parseISO } from "date-fns";
import { formatDistance } from "date-fns/esm";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function Order() {
    const searchParams = useSearchParams();
    const filter = searchParams?.get('filter');
    const {data,error,isLoading} = useOrders(typeof filter == 'string' ? `?status=${filter}`: '')
      
    if (isLoading || error) {
        return <Loading/>
    }
    if (data.length == 0) {
        return <div>Không có đơn hàng nào</div>
    }
    return (
        <>
            <div className="flow-root max-h-[400px] h-full overflow-y-scroll">
                <ul role="list" className="-mb-8">
                    {data.map((order:any) => (
                        <li key={order.id} className='pr-4'>
                            <div className="relative pb-8">
                                <div className="relative flex gap-x-3">
                                    {order.status == 'done' &&
                                        <div className="flex items-center gap-x-3">
                                            <span className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 bg-lime-100 ring-white'} >
                                                <FontAwesomeIcon className="w-5 h-5 text-lime-600" aria-hidden="true" icon={'check'} />
                                            </span>
                                            <p className="text-gray-600">
                                                Đơn hàng đã hoàn thành
                                            </p>
                                        </div>
                                    }
                                    {order.status == 'isPending' &&
                                        <div className="flex items-center gap-x-3">
                                            <span className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 bg-amber-100 ring-white'} >
                                                <FontAwesomeIcon className="w-5 h-5 text-amber-600" aria-hidden="true" icon={'truck-fast'} />
                                            </span>
                                            <p className="text-gray-600">
                                                Đang vận chuyển đơn hàng
                                            </p>
                                        </div>
                                    }
                                    {order.status == 'back' &&
                                        <div className="flex items-center gap-x-3">
                                            <span className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 bg-sky-100 ring-white'} >
                                                <FontAwesomeIcon className="w-5 h-5 text-sky-600" aria-hidden="true" icon={'rotate-left'} />
                                            </span>
                                            <p className="text-gray-600">
                                                Đơn hàng bị trả
                                            </p>
                                        </div>
                                    }
                                    {order.status == 'cancel' &&
                                        <div className="flex items-center gap-x-3">
                                            <span className={'h-8 w-8 rounded-full flex items-center justify-center ring-8 bg-red-100 ring-white'} >
                                                <FontAwesomeIcon className="w-5 h-5 text-red-600" aria-hidden="true" icon={'ban'} />
                                            </span>
                                            <p className="text-gray-600">
                                                Hủy đơn hàng
                                            </p>
                                        </div>
                                    }
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {order.content}{' '}
                                                <Link href={`/member/order/${order.id}`} className="font-medium text-gray-900">
                                                    {order.id}
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                                            <time dateTime={order.createdAt}>{formatDistance(parseISO(order.createdAt), new Date(), { addSuffix: true, locale: vi })}</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

