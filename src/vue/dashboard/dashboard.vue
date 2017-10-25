<div class="dashboard">
    <div class="modules columns is-desktop">
        <!-- Recent calls widget-->
        <div class="vg-box-wrapper column">
            <h4>{{$t('Recent calls')}}</h4>
            <div class="vg-box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th><i class="fa fa-phone"></i></th>
                            <th>{{$t('Date')}} / {{$t('Time')}}</th>
                            <th>{{$t('Caller')}}</th>
                            <th>{{$t('Destination')}}</th>
                            <th>{{$t('Duration')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5">{{$t('No calls yet')}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="vg-box-wrapper column">
            <h4>{{$t('Statistics')}}</h4>
            <div class="vg-box stats-block">
                <div class="stats-block-name">
                    {{$t('Calls answered')}}
                </div>
                <div class="stats-block-data">
                    245 <small>of</small> 256 <i class="fa fa-arrow-up"></i>
                </div>
            </div>

            <div class="vg-box stats-block">
                <div class="stats-block-name">
                    {{$t('Total call time')}}
                </div>
                <div class="stats-block-data">
                    13:05:25 <i class="fa fa-arrow-down"></i>
                </div>
            </div>
        </div>
    </div>

</div>
